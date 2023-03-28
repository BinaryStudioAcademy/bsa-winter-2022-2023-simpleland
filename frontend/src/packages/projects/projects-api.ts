import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { ProjectsApiPath } from './libs/enums/enums.js';
import { type ProjectGetAllResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class ProjectsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.PROJECTS, baseUrl, http, storage });
  }

  public async getProjects(): Promise<ProjectGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ProjectsApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<ProjectGetAllResponseDto>();
  }

  public async searchProjects(
    query: string,
  ): Promise<ProjectGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ProjectsApiPath.SEARCH, `?query=${query}`, {}),
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
