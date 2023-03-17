import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class SiteModel extends AbstractModel {
  public 'name': string;

  public 'publishedUrl': string | null;

  public static override get tableName(): string {
    return DatabaseTableName.SITES;
  }
}

export { SiteModel };
