import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class ProjectModel extends AbstractModel {
  public 'userId': number;

  public 'name': string;

  public static override get tableName(): string {
    return DatabaseTableName.PROJECTS;
  }
}

export { ProjectModel };
