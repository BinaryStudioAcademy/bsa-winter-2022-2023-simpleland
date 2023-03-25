import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { ProjectsApi } from './projects-api.js';

const projectsApi = new ProjectsApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { projectsApi };
export {
  type GetProjectsItemResponseDto,
  type GetProjectsResponseDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectUserEssence,
} from './libs/types/types.js';
