import { type IService } from '~/libs/interfaces/interfaces.js';
import { billing } from '~/libs/packages/billing/billing.js';
import {
  type TaskScheduler,
  CronExpression,
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

  private taskScheduler: TaskScheduler;

  public constructor(
    subscriptionRepository: SubscriptionRepository,
    taskScheduler: TaskScheduler,
  ) {
    this.subscriptionRepository = subscriptionRepository;
    this.taskScheduler = taskScheduler;
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
        endDate: this.getSubscriptionEndDate(),
      }),
    );

    const subscription = subscriptionEntity.toObject();

    return await userService.updateSubscription({
      id: userId,
      subscriptionId: subscription.id,
    });
  }

  private getSubscriptionEndDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    return date.toISOString();
  }

  private async deleteExpiredSubscriptions(): Promise<void> {
    await this.subscriptionRepository.deleteExpiredSubscriptions();
  }

  public initCrone(): void {
    this.taskScheduler.schedule(CronExpression.EVERY_MIDNIGHT, () => {
      void this.deleteExpiredSubscriptions();
    });
  }
}

export { SubscriptionService };
