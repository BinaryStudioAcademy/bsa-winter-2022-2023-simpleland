import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { SitesApiPath } from './libs/enums/enums.js';
import { type SectionGetAllResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class SectionsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.SITES, baseUrl, http, storage });
  }

  public async getSectionsBySiteId(
    siteId: number,
  ): Promise<SectionGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(SitesApiPath.SECTIONS_BY_SITE, {
        siteId: siteId.toString(),
      }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<SectionGetAllResponseDto>();
  }
}

export { SectionsApi };
