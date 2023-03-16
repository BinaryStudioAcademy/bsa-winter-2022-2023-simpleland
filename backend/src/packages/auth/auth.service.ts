import * as jose from 'jose';

import { config } from '~/libs/packages/config/config.js';
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

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const { email } = userRequestDto;
    return await this.login(email);
  }

  private async login(email: string): Promise<UserSignInResponseDto> {
    const user: UserAuthResponse = (await this.userService.find(
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
    const secret = new TextEncoder().encode(config.ENV.JWT.SECRET_KEY);
    return await new jose.SignJWT({ data })
      .setProtectedHeader({ alg: config.ENV.JWT.ALGORITHM })
      .setExpirationTime(config.ENV.JWT.EXP_TIME)
      .sign(secret);
  };
}

export { AuthService };
