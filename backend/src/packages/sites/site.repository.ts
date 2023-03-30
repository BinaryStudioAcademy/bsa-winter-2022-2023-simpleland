import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { SiteEntity } from '~/packages/sites/site.entity.js';
import { type SiteModel } from '~/packages/sites/site.model.js';

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

  public async findAllByProjectId(projectId: number): Promise<SiteEntity[]> {
    const sites = await this.siteModel.query().where({ projectId }).execute();

    return sites.map((site) => SiteEntity.initialize(site));
  }

  public async create(entity: SiteEntity): Promise<SiteEntity> {
    const { name } = entity.toNewObject();

    const site = await this.siteModel
      .query()
      .insert({ name })
      .returning('*')
      .execute();

    return SiteEntity.initialize(site);
  }
}

export { SiteRepository };
