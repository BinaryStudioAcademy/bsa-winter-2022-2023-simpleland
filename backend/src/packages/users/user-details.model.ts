import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { UserModel } from '~/packages/users/user.model.js';

class UserDetailsModel extends AbstractModel {
  public 'userId': number;

  public 'firstName': string;

  public 'lastName': string;

  public 'accountName': string | null;

  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: 'user_details.userId',
          to: 'users.id',
        },
      },
    };
  }
}

export { UserDetailsModel };
