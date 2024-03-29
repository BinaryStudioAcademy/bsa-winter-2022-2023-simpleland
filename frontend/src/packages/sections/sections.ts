import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { SectionsApi } from './sections-api.js';

const sectionsApi = new SectionsApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export { SectionType } from './libs/enums/enums.js';
export {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
  type SectionUpdateParametersDto,
  type SectionUpdateRequestDto,
  type SiteAboutContent,
  type SiteAboutUpdateContentDto,
  type SiteFeedbackContent,
  type SiteFeedbackUpdateContentDto,
  type SiteFooterContent,
  type SiteFooterUpdateContentDto,
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
  type SiteMainContent,
  type SiteMainUpdateContentDto,
  type SitePortfolioContent,
  type SitePortfolioUpdateContentDto,
  type SiteServiceContent,
  type SiteServiceUpdateContentDto,
} from './libs/types/types.js';
export {
  siteAboutUpdateContentValidationSchema,
  siteFeedbackUpdateContentValidationSchema,
  siteFooterUpdateContentValidationSchema,
  siteHeaderUpdateContentValidationSchema,
  siteMainUpdateContentValidationSchema,
  sitePortfolioUpdateContentValidationSchema,
  siteServiceUpdateContentValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { sectionsApi };
