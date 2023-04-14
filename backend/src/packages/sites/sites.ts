import { file } from '~/libs/packages/file/file.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { openAI } from '~/libs/packages/open-ai/open-ai.js';
import { projectService } from '~/packages/projects/projects.js';

import { SiteController } from './site.controller.js';
import { SiteModel } from './site.model.js';
import { SiteRepository } from './site.repository.js';
import { SiteService } from './site.service.js';

const siteRepository = new SiteRepository(SiteModel);
const siteService = new SiteService({
  projectService,
  siteRepository,
  file,
  openAI,
});

const siteController = new SiteController(logger, siteService);

export { siteController, siteService };
export { SitesApiPath } from './libs/enums/enums.js';
export {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllItemResponseDto,
  type SiteGetAllResponseDto,
  type SitesFilterQueryDto,
} from './libs/types/types.js';
export { siteCreateValidationSchema } from './libs/validation-schemas/validation-schemas.js';
export { SiteModel } from './site.model.js';
export { type SiteService } from './site.service.js';
