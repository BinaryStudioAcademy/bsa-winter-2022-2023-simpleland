import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/user.model.js';

class UserRepository
  implements Omit<IRepository, 'find' | 'update' | 'delete'>
{
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async find(email: string): ReturnType<IRepository['find']> {
    return await this.userModel
      .query()
      .select('id', 'email')
      .where('email', email)
      .execute();
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel
      .query()
      .select()
      .withGraphJoined('userDetails');

    return users.map((user) => {
      return UserEntity.initialize({
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
        firstName: user.userDetails.firstName,
        lastName: user.userDetails.lastName,
      });
    });
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, firstName, lastName } =
      entity.toNewObject();

    const user = await this.userModel
      .query()
      .insertGraphAndFetch({
        email,
        passwordSalt,
        passwordHash,
        userDetails: {
          firstName,
          lastName,
        },
      })
      .withGraphFetched('userDetails')
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
    });
  }
}

export { UserRepository };
