import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type SiteModel } from '~/packages/sites/site.model.js';
import { SiteModelRelation } from '~/packages/sites/sites.js';

import { SectionEntity } from './section.entity.js';

class SectionRepository
  implements Omit<IRepository, 'find' | 'findAll' | 'update' | 'delete'>
{
  private siteModel: typeof SiteModel;

  public constructor(siteModel: typeof SiteModel) {
    this.siteModel = siteModel;
  }

  public async findBySiteId(siteId: number): Promise<SectionEntity[]> {
    const sections = await this.siteModel
      .relatedQuery(SiteModelRelation.SECTIONS)
      .for(siteId);

    return sections.map((section) => SectionEntity.initialize(section));
  }

  public async create({
    siteId,
    entity,
  }: {
    siteId: number;
    entity: SectionEntity;
  }): Promise<SectionEntity> {
    const section = await this.siteModel
      .relatedQuery(SiteModelRelation.SECTIONS)
      .for(siteId)
      .insert(entity.toNewObject())
      .returning('*');

    return SectionEntity.initialize(section);
  }
}

export { SectionRepository };
