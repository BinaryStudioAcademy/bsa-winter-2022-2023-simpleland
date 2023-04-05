import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class SubscriptionModel extends AbstractModel {
  public 'subscriptionEnd': string;

  public static override get tableName(): string {
    return DatabaseTableName.SUBSCRIPTION;
  }
}

export { SubscriptionModel };
