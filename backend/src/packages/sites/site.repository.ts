import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { SiteEntity } from '~/packages/sites/site.entity.js';
import { type SiteModel } from '~/packages/sites/site.model.js';

import { type SitesFilterQueryDto } from './libs/types/types.js';

class SiteRepository
  implements Omit<IRepository<SiteEntity>, 'find' | 'update' | 'delete'>
{
  private siteModel: typeof SiteModel;

  public constructor(siteModel: typeof SiteModel) {
    this.siteModel = siteModel;
  }

  public async findAll(): Promise<SiteEntity[]> {
    const sites = await this.siteModel.query().execute();

    return sites.map((site) => SiteEntity.initialize(site));
  }

  public async find(id: number): Promise<SiteEntity | null> {
    const site = await this.siteModel.query().findById(id).execute();

    if (!site) {
      return null;
    }

    return SiteEntity.initialize(site);
  }

  public async findAllByProjectId(
    projectId: number,
    { name }: SitesFilterQueryDto,
  ): Promise<SiteEntity[]> {
    const sites = await this.siteModel
      .query()
      .where({ projectId })
      .where((builder) => {
        if (name) {
          void builder.where('name', 'ilike', `%${name}%`);
        }
      });

    return sites.map((site) => SiteEntity.initialize(site));
  }

  public async create(entity: SiteEntity): Promise<SiteEntity> {
    const { name, projectId, image } = entity.toNewObject();

    const site = await this.siteModel
      .query()
      .insert({ name, projectId, image })
      .returning('*')
      .execute();

    return SiteEntity.initialize(site);
  }
}

export { SiteRepository };
