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
    const { subscriptionEnd } = entity.toNewObject();

    const subscription = await this.subscriptionModel
      .query()
      .insert({ subscriptionEnd })
      .returning('*');

    return SubscriptionEntity.initialize({
      id: subscription.id,
      subscriptionEnd: subscriptionEnd,
    });
  }

  public async deleteExpiredSubscriptions(): Promise<void> {
    const currentDate = new Date().toISOString();

    const expiredSubscriptions = await this.subscriptionModel
      .query()
      .select('id')
      .where('subscriptionEnd', '<', currentDate)
      .execute();

    const ids = expiredSubscriptions.map(({ id }) => id);

    await this.subscriptionModel
      .relatedQuery('userDetails')
      .for(ids)
      .patch({ subscriptionId: null });

    await this.subscriptionModel.query().delete().whereIn('id', ids);
  }
}

export { SubscriptionRepository };
