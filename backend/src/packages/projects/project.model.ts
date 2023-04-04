import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ProjectType } from './libs/enums/enums.js';

class ProjectModel extends AbstractModel {
  public 'userId': number;

  public 'name': string;

  public 'type': ValueOf<typeof ProjectType>;

  public static override get tableName(): string {
    return DatabaseTableName.PROJECTS;
  }
}

export { ProjectModel };
