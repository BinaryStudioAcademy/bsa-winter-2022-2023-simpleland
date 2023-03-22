import { type ProjectGetAllResponseDto } from 'shared/build/index.js';
import { ProjectsApiPath } from 'shared/build/index.js';

import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class ProjectsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.PROJECTS, baseUrl, http, storage });
  }

  public async getUserProjects(): Promise<ProjectGetAllResponseDto> {
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
}

export { ProjectsApi };
