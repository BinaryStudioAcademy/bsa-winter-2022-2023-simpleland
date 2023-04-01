import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { SitesApiPath } from './libs/enums/enums.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class SitesApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.SITES, baseUrl, http, storage });
  }

  public async createSite(
    projectId: number,
    payload: SiteCreateRequestDto,
  ): Promise<SiteCreateResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        configureString(SitesApiPath.PROJECT_$PROJECT_ID, {
          projectId,
        }),
        {},
      ),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<SiteCreateResponseDto>();
  }

  public async getByProjectId(
    projectId: number,
  ): Promise<SiteGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        configureString(SitesApiPath.PROJECT_$PROJECT_ID, {
          projectId,
        }),
        {},
      ),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<SiteGetAllResponseDto>();
  }
}

export { SitesApi };
