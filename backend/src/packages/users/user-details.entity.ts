import { UserEntity } from '~/packages/users/user.entity.js';

class UserWithDetailsEntity extends UserEntity {
  public 'userDetails': {
    firstName: string;
    lastName: string;
  };

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    userDetails,
  }: {
    id: number | null;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    userDetails: {
      firstName: string;
      lastName: string;
    };
  }) {
    super({ id, email, passwordHash, passwordSalt });
    this.userDetails = userDetails;
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    userDetails,
  }: {
    id: number;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    userDetails: {
      firstName: string;
      lastName: string;
    };
  }): UserWithDetailsEntity {
    return new UserWithDetailsEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      userDetails,
    });
  }
  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
    userDetails,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    userDetails: {
      firstName: string;
      lastName: string;
    };
  }): UserWithDetailsEntity {
    return new UserWithDetailsEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      userDetails,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    userDetails: {
      firstName: string;
      lastName: string;
    };
  } {
    return {
      id: this.id as number,
      email: this.email,
      userDetails: {
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
      },
    };
  }
  public toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    userDetails: {
      firstName: string;
      lastName: string;
    };
  } {
    return {
      email: this.email,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      userDetails: {
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
      },
    };
  }
}

export { UserWithDetailsEntity };
