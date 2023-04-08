import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

import { SubscriptionApiPath } from './libs/enums/enums.js';
import { type SubscribeRequestDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class SubscriptionApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.SUBSCRIPTION, baseUrl, http, storage });
  }

  public async subscribe(
    payload: SubscribeRequestDto,
  ): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(SubscriptionApiPath.SUBSCRIBE, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<UserAuthResponse>();
  }
}

export { SubscriptionApi };
