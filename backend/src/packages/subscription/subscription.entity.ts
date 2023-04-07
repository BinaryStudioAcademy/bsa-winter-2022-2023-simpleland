import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SubscriptionEntity implements Omit<IEntity, 'toObject'> {
  private 'id': number | null;

  private 'endDate': string;

  private constructor({ id, endDate }: { id: number | null; endDate: string }) {
    this.id = id;
    this.endDate = endDate;
  }

  public static initialize({
    id,
    endDate,
  }: {
    id: number;
    endDate: string;
  }): SubscriptionEntity {
    return new SubscriptionEntity({
      id,
      endDate,
    });
  }

  public static initializeNew({
    endDate,
  }: {
    endDate: string;
  }): SubscriptionEntity {
    return new SubscriptionEntity({
      id: null,
      endDate,
    });
  }

  public toObject(): {
    id: number;
    endDate: string;
  } {
    return {
      id: this.id as number,
      endDate: this.endDate,
    };
  }

  public toNewObject(): {
    endDate: string;
  } {
    return {
      endDate: this.endDate,
    };
  }
}

export { SubscriptionEntity };
