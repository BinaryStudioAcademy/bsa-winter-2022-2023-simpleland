import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { UsersApiPath } from './libs/enums/enums.js';
import {
  type UserAuthResponse,
  type UserGetAllResponseDto,
  type UserUpdateLoginRequestDto,
  type UserUpdatePasswordRequestDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class UserApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.USERS, baseUrl, http, storage });
  }

  public async getAll(): Promise<UserGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: false,
      },
    );

    return await response.json<UserGetAllResponseDto>();
  }

  public async updateUser(
    payload: UserUpdateRequestDto,
  ): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ROOT, {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<UserAuthResponse>();
  }

  public async updateUserLogin(
    payload: UserUpdateLoginRequestDto,
  ): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.UPDATE_LOGIN, {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<UserAuthResponse>();
  }

  public async updateUserPassword(
    payload: UserUpdatePasswordRequestDto,
  ): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.UPDATE_PASSWORD, {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<UserAuthResponse>();
  }

  public async updateUserAvatar(payload: FormData): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.AVATAR, {}),
      {
        method: 'PUT',
        contentType: ContentType.FORM_DATA,
        hasAuth: true,
        payload,
      },
    );

    return await response.json<UserAuthResponse>();
  }
}

export { UserApi };
