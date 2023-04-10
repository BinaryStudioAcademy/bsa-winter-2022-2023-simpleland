import { file } from '~/libs/packages/file/file.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { SiteModel } from '~/packages/sites/sites.js';

import { SectionController } from './section.controller.js';
import { SectionModel } from './section.model.js';
import { SectionRepository } from './section.repository.js';
import { SectionService } from './section.service.js';

const sectionRepository = new SectionRepository(SiteModel, SectionModel);
const sectionService = new SectionService({ sectionRepository, file });
const sectionController = new SectionController(logger, sectionService);

export { SectionModel } from './section.model.js';
export { sectionService };
export { SectionType } from './libs/enums/enums.js';
export { sectionController };
export {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
} from './libs/types/types.js';
