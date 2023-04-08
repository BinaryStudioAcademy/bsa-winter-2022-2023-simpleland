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
export { ProjectCategory } from './libs/enums/enums.js';
export {
  type ProjectCreateRequestDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllParametersDto,
  type ProjectGetAllResponseDto,
  type ProjectUpdateResponseDto,
  type ProjectUploadImageDto,
} from './libs/types/types.js';
export {
  projectCreateValidationSchema,
  projectFilterValidationSchema,
  projectUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
