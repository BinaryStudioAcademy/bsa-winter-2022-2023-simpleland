import Stripe from 'stripe';

import { type IConfig } from '~/libs/packages/config/config.js';

type Constructor = {
  config: IConfig;
};

class Billing {
  private config: IConfig;

  private stripe: Stripe;

  public constructor({ config }: Constructor) {
    this.config = config;
    this.stripe = new Stripe(this.config.ENV.STRIPE.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }
}

export { Billing };
