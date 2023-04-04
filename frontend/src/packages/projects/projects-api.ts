import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import {
  type ProjectCreateRequestDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
} from '~/packages/projects/projects.js';

import { ProjectsApiPath } from './libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class ProjectsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.PROJECTS, baseUrl, http, storage });
  }

  public async createProject(
    payload: ProjectCreateRequestDto,
  ): Promise<ProjectGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ProjectsApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<ProjectGetAllItemResponseDto>();
  }

  public async getProjects(
    parameters: ProjectFilterQueryDto,
  ): Promise<ProjectGetAllResponseDto> {
    const searchParameters = new URLSearchParams(parameters);

    const response = await this.load(
      this.getFullEndpoint(
        configureString(ProjectsApiPath.ROOT, {}),
        `?${searchParameters.toString()}`,
        {},
      ),
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
