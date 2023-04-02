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
  type SiteAboutContent,
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteMainContent,
} from './libs/types/types.js';
export { sectionsApi };
