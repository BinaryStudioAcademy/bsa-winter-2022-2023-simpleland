import bcrypt  from 'bcrypt';

import { type Token } from '~/libs/packages/token/token.js';
import {
  type UserService,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

import { ApplicationError } from './libs/exceptions/exceptions.js';

class AuthService {
  private userService: UserService;
  private tokenService: Token;
  public constructor(userService: UserService, token: Token) {
    this.userService = userService;
    this.tokenService = token;
  }

  public async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto | null> {
    const { email, password } = userRequestDto;
    return await this.login(email, password);
  }
 
  private async login(email: string, password: string): Promise<UserSignInResponseDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new ApplicationError({
        message: 'User Not Exist',
      });
    }
    const passwordHash = user.passwordHash;
    if (passwordHash === undefined || passwordHash === null) {
      throw new ApplicationError({
        message: 'User password not set',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
  
    if (!isPasswordValid) {
      throw new ApplicationError({
        message: 'Invalid Password',
      });
    }
  
    return {
      token: await this.tokenService.create(user.id),
      user,
    };
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const user = await this.userService.create(userRequestDto);
    return {
      token: await this.tokenService.create(user.id),
      user,
    };
  }
}

export { AuthService };
