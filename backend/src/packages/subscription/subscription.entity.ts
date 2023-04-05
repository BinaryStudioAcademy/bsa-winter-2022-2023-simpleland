import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SubscriptionEntity implements Omit<IEntity, 'toObject'> {
  private 'id': number | null;

  private subscriptionEnd: string;

  private constructor({
    id,
    subscriptionEnd,
  }: {
    id: number | null;
    subscriptionEnd: string;
  }) {
    this.id = id;
    this.subscriptionEnd = subscriptionEnd;
  }

  public static initialize({
    id,
    subscriptionEnd,
  }: {
    id: number;
    subscriptionEnd: string;
  }): SubscriptionEntity {
    return new SubscriptionEntity({
      id,
      subscriptionEnd,
    });
  }

  public static initializeNew({
    subscriptionEnd,
  }: {
    subscriptionEnd: string;
  }): SubscriptionEntity {
    return new SubscriptionEntity({
      id: null,
      subscriptionEnd,
    });
  }

  public toObject(): {
    id: number;
    subscriptionEnd: string;
  } {
    return {
      id: this.id as number,
      subscriptionEnd: this.subscriptionEnd,
    };
  }

  public toNewObject(): {
    subscriptionEnd: string;
  } {
    return {
      subscriptionEnd: this.subscriptionEnd,
    };
  }
}

export { SubscriptionEntity };
