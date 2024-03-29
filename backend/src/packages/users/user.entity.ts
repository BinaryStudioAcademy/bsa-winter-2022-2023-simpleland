import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'email': string | null;

  private 'passwordHash': string | null;

  private 'passwordSalt': string | null;

  private 'firstName': string | null;

  private 'lastName': string | null;

  private 'accountName': string | null;

  private 'avatarId': number | null;

  private 'avatarUrl': string | null;

  private 'subscriptionId': number | null;

  private 'subscriptionEndDate': string | null;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    accountName,
    avatarId,
    avatarUrl,
    subscriptionId,
    subscriptionEndDate,
  }: {
    id: number | null;
    email: string | null;
    passwordHash: string | null;
    passwordSalt: string | null;
    firstName: string | null;
    lastName: string | null;
    accountName: string | null;
    avatarId: number | null;
    avatarUrl: string | null;
    subscriptionId: number | null;
    subscriptionEndDate: string | null;
  }) {
    this.id = id;
    this.email = email;
    this.passwordSalt = passwordSalt;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
    this.accountName = accountName;
    this.avatarId = avatarId;
    this.avatarUrl = avatarUrl;
    this.subscriptionId = subscriptionId;
    this.subscriptionEndDate = subscriptionEndDate;
  }

  public get privateData(): {
    passwordHash: string;
    passwordSalt: string;
  } {
    return {
      passwordSalt: this.passwordSalt as string,
      passwordHash: this.passwordHash as string,
    };
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    accountName,
    avatarId,
    avatarUrl,
    subscriptionId,
    subscriptionEndDate,
  }: {
    id: number | null;
    email: string | null;
    passwordHash: string | null;
    passwordSalt: string | null;
    firstName: string | null;
    lastName: string | null;
    accountName: string | null;
    avatarId: number | null;
    avatarUrl: string | null;
    subscriptionId: number | null;
    subscriptionEndDate: string | null;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      accountName,
      avatarId,
      avatarUrl,
      subscriptionId,
      subscriptionEndDate,
    });
  }

  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      accountName: null,
      avatarId: null,
      avatarUrl: null,
      subscriptionId: null,
      subscriptionEndDate: null,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    accountName: string | null;
    avatarUrl: string | null;
    subscriptionEndDate: string | null;
  } {
    return {
      id: this.id as number,
      email: this.email as string,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      accountName: this.accountName,
      avatarUrl: this.avatarUrl,
      subscriptionEndDate: this.subscriptionEndDate,
    };
  }

  public toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
  } {
    return {
      email: this.email as string,
      passwordHash: this.passwordHash as string,
      passwordSalt: this.passwordSalt as string,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
    };
  }

  public toUserDetails(): {
    id: number;
    firstName: string;
    lastName: string;
    accountName: string | null;
  } {
    return {
      id: this.id as number,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      accountName: this.accountName === '' ? null : this.accountName,
    };
  }

  public toUserAvatar(): {
    id: number;
    avatarId: number;
  } {
    return {
      id: this.id as number,
      avatarId: this.avatarId as number,
    };
  }

  public toSubscription(): {
    id: number;
    subscriptionId: number;
  } {
    return {
      id: this.id as number,
      subscriptionId: this.subscriptionId as number,
    };
  }
}

export { UserEntity };
