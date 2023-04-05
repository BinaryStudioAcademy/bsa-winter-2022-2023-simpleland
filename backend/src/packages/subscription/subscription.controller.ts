import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

import { SubscriptionApiPath } from './libs/enums/enums.js';
import { type SubscribeRequestDto } from './libs/types/types.js';
import { type SubscriptionService } from './subscription.service.js';

class SubscriptionController extends Controller {
  private subscriptionService: SubscriptionService;

  public constructor(
    logger: ILogger,
    subscriptionService: SubscriptionService,
  ) {
    super(logger, ApiPath.SUBSCRIPTION);

    this.subscriptionService = subscriptionService;

    this.addRoute({
      path: SubscriptionApiPath.SUBSCRIBE,
      method: 'POST',
      handler: (options) =>
        this.subscribe(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            body: SubscribeRequestDto;
          }>,
        ),
    });
  }

  private async subscribe({
    user: { id },
    body: { tokenId },
  }: ApiHandlerOptions<{
    user: UserAuthResponse;
    body: SubscribeRequestDto;
  }>): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.subscriptionService.subscribe({
        userId: id,
        tokenId,
      }),
    };
  }
}

export { SubscriptionController };
