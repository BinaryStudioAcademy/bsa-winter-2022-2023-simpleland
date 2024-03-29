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
export { SiteTargetType, SiteToneType } from './libs/enums/enums.js';
export {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteCreateStepIndustry,
  type SiteCreateStepName,
  type SiteCreateStepTarget,
  type SiteCreateStepTone,
  type SiteGetAllItemResponseDto,
  type SiteGetAllResponseDto,
  type SitesFilterQueryDto,
  type SitesGetByProjectIdParametersDto,
  type SitesGetByProjectIdRequestDto,
  type SitesSearchDto,
} from './libs/types/types.js';
export {
  siteCreateStepIndustryValidationSchema,
  siteCreateStepNameValidationSchema,
  siteCreateStepTargetValidationSchema,
  siteCreateStepToneValidationSchema,
  sitesFilterValidationSchema,
  sitesSearchValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
