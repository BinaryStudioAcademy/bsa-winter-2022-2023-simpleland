import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/user.model.js';

class UserRepository implements Omit<IRepository, 'delete'> {
  private userModel: typeof UserModel;

  private defaultRelationExpression = 'userDetails.avatar';

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async find(id: number): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .findById(id)
      .first()
      .withGraphJoined(this.defaultRelationExpression);

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      accountName: user.userDetails.accountName,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .where('email', email)
      .first()
      .withGraphJoined(this.defaultRelationExpression);

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      accountName: user.userDetails.accountName,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel
      .query()
      .select()
      .withGraphJoined(this.defaultRelationExpression);

    return users.map((user) => {
      return UserEntity.initialize({
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
        firstName: user.userDetails.firstName,
        lastName: user.userDetails.lastName,
        accountName: user.userDetails.accountName,
        avatarId: user.userDetails.avatarId,
        avatarUrl: user.userDetails.avatar?.url ?? null,
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
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      accountName: user.userDetails.accountName,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async update(entity: UserEntity): Promise<UserEntity> {
    const { id, firstName, lastName, accountName } = entity.toUserDetails();

    const user = await this.userModel.query().upsertGraphAndFetch({
      id,
      userDetails: {
        firstName,
        lastName,
        accountName,
      },
    });

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      accountName: user.userDetails.accountName,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async updateAvatar(entity: UserEntity): Promise<UserEntity> {
    const { id, avatarId } = entity.toUserAvatar();

    await this.userModel
      .relatedQuery('userDetails')
      .for(id)
      .patch({ avatarId });

    const user = (await this.userModel
      .query()
      .findById(id)
      .withGraphFetched(this.defaultRelationExpression)) as UserModel;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      accountName: user.userDetails.accountName,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }
}

export { UserRepository };
