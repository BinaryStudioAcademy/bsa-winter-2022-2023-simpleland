import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { SitesApi } from './sites-api.js';

const sitesApi = new SitesApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { sitesApi };
export {
  type SiteCreateIndustryName,
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteCreateStepName,
  type SiteGetAllItemResponseDto,
  type SiteGetAllResponseDto,
  type SiteGetByProjectParametersDto,
} from './libs/types/types.js';
export { siteCreateStepNameValidationSchema } from './libs/validation-schemas/validation-schemas.js';
export { siteCreateStepIndustryValidationSchema } from './libs/validation-schemas/validation-schemas.js';
