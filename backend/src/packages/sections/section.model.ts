import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

import { type SectionName } from './libs/types/types.js';

class SectionModel extends AbstractModel {
  public 'name': SectionName;

  public 'content': unknown;

  public static override get tableName(): string {
    return DatabaseTableName.SECTIONS;
  }
}

export { SectionModel };
