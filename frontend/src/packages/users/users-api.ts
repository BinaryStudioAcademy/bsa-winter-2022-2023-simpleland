import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { UsersApiPath } from './libs/enums/enums.js';
import {
  type UserAuthResponse,
  type UserGetAllResponseDto,
  type UserUpdateDetailsRequestDto,
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

  public async updateUserDetails(
    payload: UserUpdateDetailsRequestDto,
  ): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.USER_DETAILS, {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<UserAuthResponse>();
  }
}

export { UserApi };
