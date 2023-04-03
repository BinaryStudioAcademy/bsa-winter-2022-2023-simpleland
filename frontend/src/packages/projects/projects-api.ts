import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import {
  type ProjectCreateRequestDto,
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

  public async uploadProjectImage(
    projectId: number,
    payload: FormData,
  ): Promise<ProjectGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(
        configureString(
          ProjectsApiPath.PROJECT_$PROJECT_ID_AVATAR,
          {
            projectId,
          },
        ),
        {},
      ),
      {
        method: 'PUT',
        contentType: ContentType.FORM_DATA,
        hasAuth: true,
        payload,
      },
    );

    return await response.json<ProjectGetAllItemResponseDto>();
  }
}

export { ProjectsApi };
