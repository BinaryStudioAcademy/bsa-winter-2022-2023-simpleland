import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'email': string;

  private 'passwordHash': string;

  private 'passwordSalt': string;

  private 'firstName': string;

  private 'lastName': string;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
  }: {
    id: number | null;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
  }) {
    this.id = id;
    this.email = email;
    this.passwordSalt = passwordSalt;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
  }: {
    id: number;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
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
    });
  }

  public toObject(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } {
    return {
      id: this.id as number,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
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
      email: this.email,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}

export { UserEntity };
