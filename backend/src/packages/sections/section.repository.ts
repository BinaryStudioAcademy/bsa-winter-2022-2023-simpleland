import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type SiteModel } from '~/packages/sites/site.model.js';

import { SectionEntity } from './section.entity.js';
import { type SectionModel } from './section.model.js';

class SectionRepository
  implements Omit<IRepository, 'find' | 'findAll' | 'delete'>
{
  private siteModel: typeof SiteModel;

  private sectionModel: typeof SectionModel;

  public constructor(
    siteModel: typeof SiteModel,
    sectionModel: typeof SectionModel,
  ) {
    this.siteModel = siteModel;
    this.sectionModel = sectionModel;
  }

  public async findBySiteId(siteId: number): Promise<SectionEntity[]> {
    const sections = await this.siteModel.relatedQuery('sections').for(siteId);

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
      .relatedQuery('sections')
      .for(siteId)
      .insert(entity.toNewObject())
      .returning('*');

    return SectionEntity.initialize(section);
  }

  public async find(id: number): Promise<SectionEntity | null> {
    const section = await this.sectionModel.query().findById(id);

    if (!section) {
      return null;
    }

    return SectionEntity.initialize(section);
  }

  public async update(entity: SectionEntity): Promise<SectionEntity> {
    const { id, content } = entity.toContentUpdate();

    const section = await this.sectionModel
      .query()
      .patchAndFetchById(id, { content });

    return SectionEntity.initialize(section);
  }
}

export { SectionRepository };
