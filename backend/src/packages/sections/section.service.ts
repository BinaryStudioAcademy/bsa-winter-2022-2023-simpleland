import { type IService } from '~/libs/interfaces/interfaces.js';
import { type SectionRepository } from '~/packages/sections/section.repository.js';

import { type SectionGetAllResponseDto } from './libs/types/types.js';

class SectionService
  implements
    Omit<IService, 'find' | 'findAll' | 'create' | 'update' | 'delete'>
{
  private sectionRepository: SectionRepository;

  public constructor(sectionRepository: SectionRepository) {
    this.sectionRepository = sectionRepository;
  }

  public async findBySiteId(siteId: number): Promise<SectionGetAllResponseDto> {
    const sections = await this.sectionRepository.findBySiteId(siteId);

    return { items: sections.map((section) => section.toObject()) };
  }
}

export { SectionService };
