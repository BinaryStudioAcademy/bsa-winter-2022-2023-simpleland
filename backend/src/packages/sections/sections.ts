import { SiteModel } from '~/packages/sites/sites.js';

import { SectionRepository } from './section.repository.js';
import { SectionService } from './section.service.js';

const sectionRepository = new SectionRepository(SiteModel);
const sectionService = new SectionService(sectionRepository);

export { SectionModel } from './section.model.js';
export { sectionService };
export { SectionType } from './libs/enums/enums.js';
export {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
} from './libs/types/types.js';
