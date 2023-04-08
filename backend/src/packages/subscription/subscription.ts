import { logger } from '~/libs/packages/logger/logger.js';
import { taskScheduler } from '~/libs/packages/task-scheduler/task-scheduler.js';

import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionModel } from './subscription.model.js';
import { SubscriptionRepository } from './subscription.repository.js';
import { SubscriptionService } from './subscription.service.js';

const subscriptionRepository = new SubscriptionRepository(SubscriptionModel);
const subscriptionService = new SubscriptionService(
  subscriptionRepository,
  taskScheduler,
);
const subscriptionController = new SubscriptionController(
  logger,
  subscriptionService,
);

export { subscriptionService };
export { subscriptionController };
export { SubscriptionModel } from './subscription.model.js';
