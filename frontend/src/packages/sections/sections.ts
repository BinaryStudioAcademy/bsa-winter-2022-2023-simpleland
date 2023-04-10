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
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
  type SiteMainContent,
  type SitePortfolioContent,
  type SiteServiceContent,
} from './libs/types/types.js';
export {
  siteAboutUpdateContentValidationSchema,
  siteHeaderUpdateContentValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { sectionsApi };
