import Stripe from 'stripe';

import { type IConfig } from '~/libs/packages/config/config.js';

type Constructor = {
  config: IConfig;
};

class Billing {
  private config: IConfig;

  private stripe: Stripe;

  private currency = 'usd';

  private multiplierToSmallestUnit = 100;

  public constructor({ config }: Constructor) {
    this.config = config;
    this.stripe = new Stripe(this.config.ENV.STRIPE.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  public async createCharge({
    tokenId,
    price,
  }: {
    price: number;
    tokenId: string;
  }): Promise<Stripe.Charge> {
    return await this.stripe.charges.create({
      source: tokenId,
      amount: this.getPriceInSmallestUnit(price),
      currency: this.currency,
    });
  }

  private getPriceInSmallestUnit(amount: number): number {
    return amount * this.multiplierToSmallestUnit;
  }
}

export { Billing };
