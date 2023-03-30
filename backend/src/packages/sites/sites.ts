import { logger } from '~/libs/packages/logger/logger.js';

import { SiteController } from './site.controller.js';
import { SiteModel } from './site.model.js';
import { SiteRepository } from './site.repository.js';
import { SiteService } from './site.service.js';

const siteRepository = new SiteRepository(SiteModel);
const siteService = new SiteService(siteRepository);

const siteController = new SiteController(logger, siteService);

export { siteController, siteService };
export { SitesApiPath } from './libs/enums/enums.js';
export {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllItemResponseDto,
  type SiteGetAllResponseDto,
} from './libs/types/types.js';
export { siteCreateValidationSchema } from './libs/validation-schemas/validation-schemas.js';
export { SiteModel } from './site.model.js';
