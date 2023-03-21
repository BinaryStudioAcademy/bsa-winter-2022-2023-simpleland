import { type IService } from '~/libs/interfaces/interfaces.js';
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

  public async findByProject(
    projectId: number,
  ): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findByProject(projectId);

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async create(
    payload: SiteCreateRequestDto,
  ): Promise<SiteCreateResponseDto> {
    const site = await this.siteRepository.create(
      SiteEntity.initializeNew(payload),
    );

    return site.toObject();
  }
}

export { SiteService };
