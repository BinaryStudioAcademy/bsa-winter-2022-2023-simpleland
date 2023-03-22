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
  type SiteGetAllResponseDto,
  type SiteGetByProjectRequestDtoType,
} from './libs/types/types.js';
