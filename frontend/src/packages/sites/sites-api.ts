import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type SectionGetAllResponseDto } from '~/packages/sections/sections.js';

import { SitesApiPath } from './libs/enums/enums.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllResponseDto,
  type SitesGetByProjectIdRequestDto,
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

  public async getByProjectId({
    parameters,
    queryParameters: { name, page, limit },
  }: SitesGetByProjectIdRequestDto): Promise<SiteGetAllResponseDto> {
    const searchParameters = new URLSearchParams({
      name,
      page: page.toString(),
      limit: limit.toString(),
    });
    const { projectId } = parameters;

    const response = await this.load(
      this.getFullEndpoint(
        configureString(SitesApiPath.PROJECT_$PROJECT_ID, {
          projectId,
        }),
        `?${searchParameters.toString()}`,
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

  public async getSectionsBySiteId(
    siteId: number,
  ): Promise<SectionGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(SitesApiPath.$SITE_ID_SECTIONS, {
        siteId: siteId.toString(),
      }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: false,
      },
    );

    return await response.json<SectionGetAllResponseDto>();
  }
}

export { SitesApi };
