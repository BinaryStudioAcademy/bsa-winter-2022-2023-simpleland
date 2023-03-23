import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type SiteModel } from '~/packages/sites/site.model.js';

import { SectionEntity } from './section.entity.js';

class SectionRepository
  implements
    Omit<IRepository, 'find' | 'findAll' | 'create' | 'update' | 'delete'>
{
  private siteModel: typeof SiteModel;

  public constructor(siteModel: typeof SiteModel) {
    this.siteModel = siteModel;
  }

  public async findSectionsBySiteId(siteId: number): Promise<SectionEntity[]> {
    const sections = await this.siteModel.relatedQuery('sections').for(siteId);

    return sections.map((section) => SectionEntity.initialize(section));
  }
}

export { SectionRepository };
