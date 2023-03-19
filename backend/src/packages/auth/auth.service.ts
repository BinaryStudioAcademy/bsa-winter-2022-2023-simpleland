import { type Token } from '~/libs/packages/token/token.js';
import {
  type UserAuthResponse,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/users.js';

class AuthService {
  private userService: UserService;
  private tokenServise: Token;
  public constructor(userService: UserService, token: Token) {
    this.userService = userService;
    this.tokenServise = token;
  }

  public async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto | null> {
    const { email } = userRequestDto;
    return await this.login(email);
  }

  private async login(email: string): Promise<UserSignInResponseDto> {
    const user: UserAuthResponse = (await this.userService.findByEmail(
      email,
    )) as UserAuthResponse;
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
    return await this.tokenServise.create(data);
  };
}

export { AuthService };
