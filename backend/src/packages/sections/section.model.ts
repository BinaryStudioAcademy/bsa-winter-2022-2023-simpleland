import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type SectionType } from './libs/enums/enums.js';

class SectionModel extends AbstractModel {
  public 'name': string;

  public 'type': ValueOf<typeof SectionType>;

  public 'content': unknown;

  public static override get tableName(): string {
    return DatabaseTableName.SECTIONS;
  }
}

export { SectionModel };
