import {
  ApplicationError,
  ApplicationErrorMessage,
} from 'shared/build/index.js';

import { type Token } from '~/libs/packages/token/token.js';
import {
  type UserService,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

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
    const { email } = userRequestDto;
    return await this.login(email);
  }

  private async login(email: string): Promise<UserSignInResponseDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new ApplicationError({
        message: ApplicationErrorMessage.userNotFound,
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
