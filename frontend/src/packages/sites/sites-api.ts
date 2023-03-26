import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type SiteGetAllResponseDto } from '~/packages/sites/sites.js';

import { ProjectsApiPath } from '../projects/libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class SitesApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: '', baseUrl, http, storage });
  }

  public async getByProjectId(
    projectId: number,
  ): Promise<SiteGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        configureString(ApiPath.SITES, ProjectsApiPath.PROJECT_PROJECT_ID, {
          projectId: projectId.toString(),
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
