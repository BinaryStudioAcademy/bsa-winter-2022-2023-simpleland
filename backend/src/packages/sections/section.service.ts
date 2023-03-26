import { type IService } from '~/libs/interfaces/interfaces.js';
import { openAI } from '~/libs/packages/open-ai/open-ai.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SectionRepository } from '~/packages/sections/section.repository.js';
import { type SiteCreateRequestDto } from '~/packages/sites/sites.js';

import { type SectionType } from './libs/enums/enums.js';
import {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
} from './libs/types/types.js';
import { SectionEntity } from './section.entity.js';

class SectionService
  implements Omit<IService, 'find' | 'findAll' | 'update' | 'delete'>
{
  private sectionRepository: SectionRepository;

  public constructor(sectionRepository: SectionRepository) {
    this.sectionRepository = sectionRepository;
  }

  public async findBySiteId(siteId: number): Promise<SectionGetAllResponseDto> {
    const sections = await this.sectionRepository.findBySiteId(siteId);

    return { items: sections.map((section) => section.toObject()) };
  }

  public async create(payload: {
    siteId: number;
    type: ValueOf<typeof SectionType>;
    contentInfo: SiteCreateRequestDto;
  }): Promise<SectionGetAllItemResponseDto> {
    // TODO: Content generation with openAI api
    const content = {};

    const section = await this.sectionRepository.create({
      siteId: payload.siteId,
      entity: SectionEntity.initializeNew({
        type: payload.type,
        content,
      }),
    });

    return section.toObject();
  }
}

export { SectionService };
