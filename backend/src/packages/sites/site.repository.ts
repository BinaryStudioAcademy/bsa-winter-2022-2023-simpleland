import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { SiteEntity } from '~/packages/sites/site.entity.js';
import { type SiteModel } from '~/packages/sites/site.model.js';

class SiteRepository
  implements
    Omit<IRepository<SiteEntity>, 'find' | 'create' | 'update' | 'delete'>
{
  private siteModel: typeof SiteModel;

  public constructor(siteModel: typeof SiteModel) {
    this.siteModel = siteModel;
  }

  public async findAll(): Promise<SiteEntity[]> {
    const sites = await this.siteModel.query().execute();

    return sites.map((site) => SiteEntity.initialize(site));
  }
}

export { SiteRepository };
