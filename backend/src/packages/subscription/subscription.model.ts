import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { UserDetailsModel } from '~/packages/users/users.js';

class SubscriptionModel extends AbstractModel {
  public 'subscriptionEnd': string;

  public static override get tableName(): string {
    return DatabaseTableName.SUBSCRIPTION;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      userDetails: {
        relation: Model.HasOneRelation,
        modelClass: UserDetailsModel,
        join: {
          from: getJoinRelationPath(DatabaseTableName.SUBSCRIPTION, 'id'),
          to: getJoinRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'subscriptionId',
          ),
        },
      },
    };
  }
}

export { SubscriptionModel };
