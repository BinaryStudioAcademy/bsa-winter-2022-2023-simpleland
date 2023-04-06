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
  type SiteGetByProjectParametersDto,
  type SitesFilterQueryDto,
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

  private isQueryParametersExist(
    queryParameters: SitesFilterQueryDto,
  ): boolean {
    {
      return Object.values(queryParameters).some((element) => element !== '');
    }
  }

  public async getByProjectId({
    projectId,
    queryParameters,
  }: SiteGetByProjectParametersDto): Promise<SiteGetAllResponseDto> {
    const searchParameters = this.isQueryParametersExist(queryParameters)
      ? `?${new URLSearchParams(queryParameters).toString()}`
      : '';

    const response = await this.load(
      this.getFullEndpoint(
        configureString(SitesApiPath.PROJECT_$PROJECT_ID, {
          projectId: projectId.toString(),
        }),
        searchParameters,
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
