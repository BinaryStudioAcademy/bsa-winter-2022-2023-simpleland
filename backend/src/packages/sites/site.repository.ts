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
    const sites = await this.siteModel
      .query()
      .withGraphFetched('user')
      .execute();

    return sites.map(({ user, ...site }) =>
      SiteEntity.initialize({ ...site, userId: user.id }),
    );
  }

  public async find(id: number): Promise<SiteEntity | null> {
    const result = await this.siteModel
      .query()
      .findById(id)
      .withGraphFetched('user')
      .execute();

    if (!result) {
      return null;
    }

    const { user, ...site } = result;

    return SiteEntity.initialize({ ...site, userId: user.id });
  }

  public async findAllByProjectId(
    projectId: number,
    { name, page, limit }: SitesFilterQueryDto,
  ): Promise<{
    totalCount: number;
    items: SiteEntity[];
  }> {
    const offset = page - 1;

    const { total, results } = await this.siteModel
      .query()
      .where({ projectId })
      .where((builder) => {
        if (name) {
          void builder.where('name', 'ilike', `%${name}%`);
        }
      })
      .withGraphFetched('user')
      .page(offset, limit);

    return {
      totalCount: total,
      items: results.map(({ user, ...site }) =>
        SiteEntity.initialize({ ...site, userId: user.id }),
      ),
    };
  }

  public async create(entity: SiteEntity): Promise<SiteEntity> {
    const { name, projectId, image } = entity.toNewObject();

    const { user, ...site } = await this.siteModel
      .query()
      .insert({ name, projectId, image })
      .returning('*')
      .withGraphFetched('user')
      .execute();

    return SiteEntity.initialize({ ...site, userId: user.id });
  }
}

export { SiteRepository };
