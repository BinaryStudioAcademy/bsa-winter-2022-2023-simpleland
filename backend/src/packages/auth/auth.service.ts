import {
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { createToken } from './libs/helpers/token/create-token/create.token.helper.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public signIn(userRequestDto: UserSignInRequestDto): UserSignInResponseDto {
    const id = Math.floor(Math.random() * 100); //replase with proper id from database
    return {
      token: createToken(id),
      user: { id, email: userRequestDto.email },
    };
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return await this.userService.create(userRequestDto);
  }
}

export { AuthService };
