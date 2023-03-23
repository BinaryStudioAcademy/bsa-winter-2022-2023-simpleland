import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class SectionModel extends AbstractModel {
  public 'name': string;

  public 'content': string;

  public static override get tableName(): string {
    return DatabaseTableName.SECTIONS;
  }
}

export { SectionModel };
