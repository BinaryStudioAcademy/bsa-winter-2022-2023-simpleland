import { type ValueOf } from '~/libs/types/types.js';

import { type Abstract as AbstractModel } from '../../../abstract.model.js';
import { type DatabaseTableName } from '../../enums/enums.js';

const getJoinRelationPath = <T extends AbstractModel>(
  databaseTableName: ValueOf<typeof DatabaseTableName>,
  relationKey: keyof T,
): string => {
  return `${databaseTableName}.${relationKey.toString()}`;
};

export { getJoinRelationPath };
