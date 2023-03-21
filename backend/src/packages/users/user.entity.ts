import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'email': string | null;

  private 'passwordHash': string | null;

  private 'passwordSalt': string | null;

  private 'firstName': string | null;

  private 'lastName': string | null;

  private 'accountName': string | null;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    accountName,
  }: {
    id: number | null;
    email: string | null;
    passwordHash: string | null;
    passwordSalt: string | null;
    firstName: string | null;
    lastName: string | null;
    accountName: string | null;
  }) {
    this.id = id;
    this.email = email;
    this.passwordSalt = passwordSalt;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
    this.accountName = accountName;
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    accountName,
  }: {
    id: number | null;
    email: string | null;
    passwordHash: string | null;
    passwordSalt: string | null;
    firstName: string | null;
    lastName: string | null;
    accountName: string | null;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      accountName,
    });
  }

  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    accountName,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
    accountName: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      accountName,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    accountName: string;
  } {
    return {
      id: this.id as number,
      email: this.email as string,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      accountName: this.accountName as string,
    };
  }

  public toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
    accountName: string;
  } {
    return {
      email: this.email as string,
      passwordHash: this.passwordHash as string,
      passwordSalt: this.passwordSalt as string,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      accountName: this.accountName as string,
    };
  }

  public toUserDetails(): {
    id: number;
    firstName: string;
    lastName: string;
    accountName: string;
  } {
    return {
      id: this.id as number,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      accountName: this.accountName as string,
    };
  }
}

export { UserEntity };
