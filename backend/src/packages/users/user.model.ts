import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { UserDetailsModel } from '~/packages/users/user-details.model.js';

class UserModel extends AbstractModel {
  public 'email': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

  public 'userDetails': UserDetailsModel;

  public static override get tableName(): string {
    return DatabaseTableName.USERS;
  }

  public static override relationMappings = (): RelationMappings => ({
    userDetails: {
      relation: Model.HasOneRelation,
      modelClass: UserDetailsModel,
      join: {
        from: 'users.id',
        to: getJoinRelationPath<UserDetailsModel>(
          DatabaseTableName.USER_DETAILS,
          'userId',
        ),
      },
    }
  });
}

export { UserModel };
