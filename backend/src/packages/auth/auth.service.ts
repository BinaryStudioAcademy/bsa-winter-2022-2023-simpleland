import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type Encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { type Token } from '~/libs/packages/token/token.js';
import {
  type UserAuthResponse,
  type UserPrivateData,
  type UserService,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
  type UserTokenPayload,
} from '~/packages/users/users.js';

class AuthService {
  private userService: UserService;

  private token: Token;

  private encrypt: Encrypt;

  public constructor(userService: UserService, token: Token, encrypt: Encrypt) {
    this.userService = userService;
    this.token = token;
    this.encrypt = encrypt;
  }

  public async signIn(
    userSignInDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const { password, email } = userSignInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new ApplicationError({
        message: 'User with this email does not exist.',
      });
    }

    const userPrivateData = (await this.userService.findPrivateData(
      user.id,
    )) as UserPrivateData;

    const hasSamePassword = await this.encrypt.compare({
      data: password,
      salt: userPrivateData.passwordSalt,
      passwordHash: userPrivateData.passwordHash,
    });

    if (!hasSamePassword) {
      throw new ApplicationError({
        message: 'Password is not correct!',
      });
    }

    return {
      token: await this.token.create<UserTokenPayload>({
        userId: user.id,
      }),
      user,
    };
  }

  public async signUp(
    userSignInDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const existedUser = await this.userService.findByEmail(userSignInDto.email);

    if (existedUser) {
      throw new ApplicationError({
        message: 'User with this email address already exists.',
      });
    }

    const user = await this.userService.create(userSignInDto);
    const token = await this.token.create<UserTokenPayload>({
      userId: user.id,
    });

    return {
      user,
      token,
    };
  }

  public async getCurrent(token: string): Promise<UserAuthResponse> {
    const { userId } = this.token.decode<UserTokenPayload>(token);
    const user = await this.userService.find(userId);

    if (!user) {
      throw new HttpError({
        message: 'User not found',
        status: HttpCode.NOT_FOUND,
      });
    }

    return user;
  }
}

export { AuthService };
