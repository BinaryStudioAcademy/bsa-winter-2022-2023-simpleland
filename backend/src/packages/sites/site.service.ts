import { type IService } from '~/libs/interfaces/interfaces.js';
import { type SiteRepository } from '~/packages/sites/site.repository.js';

import {
  type SiteGetAllItemResponseDto,
  type SiteGetAllResponseDto,
} from './libs/types/types.js';

class SiteService
  implements
    Omit<
      IService<SiteGetAllItemResponseDto>,
      'find' | 'create' | 'update' | 'delete'
    >
{
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
}

export { SiteService };
