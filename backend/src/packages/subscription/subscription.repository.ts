import { type IRepository } from '~/libs/interfaces/interfaces.js';

import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionModel } from './subscription.model.js';

class SubscriptionRepository
  implements
    Omit<
      IRepository<SubscriptionEntity>,
      'find' | 'update' | 'delete' | 'findAll' | 'create'
    >
{
  private subscriptionModel: typeof SubscriptionModel;

  public constructor(subscriptionModel: typeof SubscriptionModel) {
    this.subscriptionModel = subscriptionModel;
  }

  public async create(entity: SubscriptionEntity): Promise<SubscriptionEntity> {
    const { endDate } = entity.toNewObject();

    const subscription = await this.subscriptionModel
      .query()
      .insert({ endDate })
      .returning('*');

    return SubscriptionEntity.initialize(subscription);
  }
}

export { SubscriptionRepository };
