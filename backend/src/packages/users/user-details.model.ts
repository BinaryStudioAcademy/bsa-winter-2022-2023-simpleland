import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { FileModel } from '~/libs/packages/file/file.js';
import { SubscriptionModel } from '~/packages/subscription/subscription.js';
import { UserModel } from '~/packages/users/user.model.js';

class UserDetailsModel extends AbstractModel {
  public 'userId': number;

  public 'firstName': string;

  public 'lastName': string;

  public 'accountName': string | null;

  public 'avatarId': number | null;

  public 'avatar': FileModel | null;

  public 'subscriptionId': number | null;

  public 'subscription': SubscriptionModel | null;

  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: getJoinRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'userId',
          ),
          to: getJoinRelationPath(DatabaseTableName.USERS, 'id'),
        },
      },
      avatar: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: getJoinRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'avatarId',
          ),
          to: getJoinRelationPath(DatabaseTableName.FILES, 'id'),
        },
      },
      subscription: {
        relation: Model.HasOneRelation,
        modelClass: SubscriptionModel,
        join: {
          from: getJoinRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'subscriptionId',
          ),
          to: getJoinRelationPath(DatabaseTableName.SUBSCRIPTION, 'id'),
        },
      },
    };
  }
}

export { UserDetailsModel };
