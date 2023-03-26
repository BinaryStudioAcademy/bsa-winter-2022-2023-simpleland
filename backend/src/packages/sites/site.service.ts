import { type IService } from '~/libs/interfaces/interfaces.js';
import {
  type SectionGetAllResponseDto,
  sectionService,
  SectionType,
} from '~/packages/sections/sections.js';
import { SiteEntity } from '~/packages/sites/site.entity.js';
import { type SiteRepository } from '~/packages/sites/site.repository.js';

import {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllResponseDto,
} from './libs/types/types.js';

class SiteService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private siteRepository: SiteRepository;

  public constructor(siteRepository: SiteRepository) {
    this.siteRepository = siteRepository;
  }

  public async findAll(): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAll();

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async create(
    payload: SiteCreateRequestDto,
  ): Promise<SiteCreateResponseDto> {
    const site = await this.siteRepository
      .create(SiteEntity.initializeNew({ name: payload.name }))
      .then((site) => site.toObject());

    const sectionPayload = {
      siteId: site.id,
      contentInfo: payload,
    };

    await Promise.all([
      sectionService.create({ ...sectionPayload, type: SectionType.HEADER }),
      sectionService.create({ ...sectionPayload, type: SectionType.MAIN }),
      sectionService.create({ ...sectionPayload, type: SectionType.FOOTER }),
    ]);

    return site;
  }

  public async findSectionsBySiteId(
    siteId: number,
  ): Promise<SectionGetAllResponseDto> {
    return await sectionService.findBySiteId(siteId);
  }
}

export { SiteService };
