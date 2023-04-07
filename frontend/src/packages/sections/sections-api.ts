import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { SectionsApiPath, SitesApiPath } from './libs/enums/enums.js';
import {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
  type SiteHeaderContent,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class SectionsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: '', baseUrl, http, storage });
  }

  public async getSectionsBySiteId(
    siteId: number,
  ): Promise<SectionGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ApiPath.SITES, SitesApiPath.$SITE_ID_SECTIONS, {
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

  public async updateContent(payload: {
    id: number;
    content: unknown;
  }): Promise<SectionGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ApiPath.SECTIONS, SectionsApiPath.$ID, {
        id: payload.id.toString(),
      }),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify({ content: payload.content }),
      },
    );

    return await response.json<SectionGetAllItemResponseDto>();
  }
}

export { SectionsApi };
