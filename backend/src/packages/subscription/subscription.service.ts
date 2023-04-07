import { type IService } from '~/libs/interfaces/interfaces.js';
import { billing } from '~/libs/packages/billing/billing.js';
import {
  CronExpression,
  taskScheduler,
} from '~/libs/packages/task-scheduler/task-scheduler.js';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { userService } from '~/packages/users/users.js';

import { SUBSCRIPTION_PRICE } from './libs/constants/constants.js';
import { SubscriptionEntity } from './subscription.entity.js';
import { type SubscriptionRepository } from './subscription.repository.js';

class SubscriptionService
  implements
    Omit<IService, 'find' | 'findAll' | 'update' | 'delete' | 'create'>
{
  private subscriptionRepository: SubscriptionRepository;

  public constructor(subscriptionRepository: SubscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository;

    taskScheduler.schedule(CronExpression.EVERY_MIDNIGHT, () => {
      void this.deleteExpiredSubscriptions();
    });
  }

  public async subscribe({
    userId,
    tokenId,
  }: {
    userId: number;
    tokenId: string;
  }): Promise<UserAuthResponse> {
    await billing.createCharge({
      tokenId,
      price: SUBSCRIPTION_PRICE,
    });

    const subscriptionEntity = await this.subscriptionRepository.create(
      SubscriptionEntity.initializeNew({
        subscriptionEnd: this.getSubscriptionEnd(),
      }),
    );

    const subscription = subscriptionEntity.toObject();

    return await userService.updateSubscription({
      id: userId,
      subscriptionId: subscription.id,
    });
  }

  private getSubscriptionEnd(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    return date.toISOString();
  }

  private async deleteExpiredSubscriptions(): Promise<void> {
    await this.subscriptionRepository.deleteExpiredSubscriptions();
  }
}

export { SubscriptionService };
