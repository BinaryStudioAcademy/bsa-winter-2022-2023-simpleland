import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { ProjectsApiPath } from './libs/enums/enums.js';
import {
  type ProjectGetAllResponseDto,
  type ProjectSearchParameters,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class ProjectsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.PROJECTS, baseUrl, http, storage });
  }

  public async getProjects(
    parameters?: ProjectSearchParameters,
  ): Promise<ProjectGetAllResponseDto> {
    const searchParameters = new URLSearchParams();

    if (parameters?.query) {
      searchParameters.append('query', parameters.query);
    }

    const response = await this.load(
      parameters
        ? this.getFullEndpoint(
            ProjectsApiPath.ROOT,
            `?${searchParameters.toString()}`,
            {},
          )
        : this.getFullEndpoint(ProjectsApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<ProjectGetAllResponseDto>();
  }
}

export { ProjectsApi };
