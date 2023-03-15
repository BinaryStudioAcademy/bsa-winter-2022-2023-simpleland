import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/user.model.js';
import { type UserDetailsModel } from '~/packages/users/user-details.model.js';

class UserRepository implements IRepository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public find(): ReturnType<IRepository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel
      .query()
      .withGraphFetched('userDetails')
      .execute();

    return users.map((it) => UserEntity.initialize(it));
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, firstName, lastName } =
      entity.toNewObject();

    const item = await this.userModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash,
      })
      .returning('*')
      .execute();

    await item
      .$relatedQuery<UserDetailsModel>('userDetails')
      .insert({ firstName, lastName });

    return UserEntity.initialize({
      ...item,
      firstName,
      lastName,
    });
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
