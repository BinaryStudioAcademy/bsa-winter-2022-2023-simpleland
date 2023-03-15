import { Model } from 'objection';
import { type RelationMappings } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { UserDetailsModel } from '~/packages/users/user-details.model.js';

class UserModel extends AbstractModel {
  public 'email': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

  public 'firstName': string;

  public 'lastName': string;

  public userDetails: UserDetailsModel = new UserDetailsModel();

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }
  public static override get relationMappings(): RelationMappings {
    return {
      userDetails: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: 'users.id',
          to: 'user_details.user_id',
        },
      },
    };
  }
}

export { UserModel };
