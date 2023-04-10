import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { SectionsApiPath } from './libs/enums/enums.js';
import {
  type SectionGetAllItemResponseDto,
  type SectionUpdateParametersDto,
  type SectionUpdateRequestDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class SectionsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.SECTIONS, baseUrl, http, storage });
  }

  public async updateContent({
    id,
    ...body
  }: SectionUpdateRequestDto &
    SectionUpdateParametersDto): Promise<SectionGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(SectionsApiPath.$ID, {
        id,
      }),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(body),
      },
    );

    return await response.json<SectionGetAllItemResponseDto>();
  }
}

export { SectionsApi };
