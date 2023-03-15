import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/user.model.js';
import { UserWithDetailsEntity } from '~/packages/users/user-details.entity.js';
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
    const users = await this.userModel.query().execute();

    return users.map((it) => UserEntity.initialize(it));
  }

  public async create(
    entity: UserWithDetailsEntity,
  ): Promise<UserWithDetailsEntity> {
    const { email, passwordSalt, passwordHash } = entity.toNewObject();
    const { firstName = '', lastName = '' } = entity.userDetails;

    const item = await this.userModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash,
      })
      .returning('*')
      .execute();

    if (firstName && lastName) {
      await item
        .$relatedQuery<UserDetailsModel>('userDetails')
        .insert({ firstName, lastName });
    }

    return UserWithDetailsEntity.initialize({
      ...item,
      userDetails: { firstName, lastName },
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
