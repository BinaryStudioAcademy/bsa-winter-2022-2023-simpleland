import { type Token } from '~/libs/packages/token/token-package.js';
import {
  type UserAuthResponse,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

class AuthService {
  private userService: UserService;
  private token: Token;
  public constructor(userService: UserService, token: Token) {
    this.userService = userService;
    this.token = token;
  }

  public async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const { email } = userRequestDto;
    return await this.login(email);
  }

  private async login(email: string): Promise<UserSignInResponseDto> {
    const user: UserAuthResponse = await this.userService.findByEmail(email);
    return {
      token: await this.createToken(user.id),
      user,
    };
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const user = await this.userService.create(userRequestDto);
    return {
      token: await this.createToken(user.id),
      user,
    };
  }

  private createToken = async (data: number): Promise<string> => {
    return await this.token.createToken(data);
  };
}

export { AuthService };
