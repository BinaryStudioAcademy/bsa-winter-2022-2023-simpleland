import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import { file } from '~/libs/packages/file/file.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserAuthResponse,
  type UserGetAllResponseDto,
  type UserPrivateData,
  type UserSignUpRequestDto,
  type UserUpdateLoginRequestDto,
  type UserUpdatePasswordRequestDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';

class UserService implements Omit<IService, 'find' | 'delete'> {
  private userRepository: UserRepository;

  private encrypt: IEncrypt;

  private config: IConfig;

  public constructor(
    userRepository: UserRepository,
    config: IConfig,
    encrypt: IEncrypt,
  ) {
    this.userRepository = userRepository;
    this.encrypt = encrypt;
    this.config = config;
  }

  public async find(id: number): Promise<UserAuthResponse | null> {
    const user = await this.userRepository.find(id);

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  public async findByEmail(email: string): Promise<UserAuthResponse | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  public async findAll(): Promise<UserGetAllResponseDto> {
    const items = await this.userRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserAuthResponse> {
    const passwordSalt = await this.encrypt.generateSalt(
      this.config.ENCRYPTION.USER_PASSWORD_SALT_ROUNDS,
    );
    const passwordHash = await this.encrypt.encrypt(
      payload.password,
      passwordSalt,
    );

    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        passwordSalt,
        passwordHash,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    );

    return user.toObject();
  }

  public async update(
    id: number,
    payload: UserUpdateRequestDto,
  ): Promise<UserAuthResponse> {
    const user = await this.userRepository.update(
      UserEntity.initialize({
        id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        accountName: payload.accountName,
        email: null,
        passwordHash: null,
        passwordSalt: null,
        avatarId: null,
        avatarUrl: null,
        subscriptionId: null,
        subscriptionEndDate: null,
      }),
    );

    return user.toObject();
  }

  public async updatePassword(
    id: number,
    payload: UserUpdatePasswordRequestDto,
  ): Promise<UserAuthResponse> {
    const userPrivateData = (await this.findPrivateData(id)) as UserPrivateData;
    const hasSamePassword = await this.encrypt.compare({
      data: payload.password,
      salt: userPrivateData.passwordSalt,
      passwordHash: userPrivateData.passwordHash,
    });

    if (!hasSamePassword) {
      throw new ApplicationError({
        message: 'Password is not correct!',
      });
    }
    const passwordSalt = await this.encrypt.generateSalt(
      this.config.ENCRYPTION.USER_PASSWORD_SALT_ROUNDS,
    );
    const passwordHash = await this.encrypt.encrypt(
      payload.newPassword,
      passwordSalt,
    );
    const user = await this.userRepository.updatePassword(
      UserEntity.initialize({
        id,
        firstName: null,
        lastName: null,
        accountName: null,
        email: null,
        passwordHash: passwordHash,
        passwordSalt: passwordSalt,
        avatarId: null,
        avatarUrl: null,
        subscriptionId: null,
        subscriptionEndDate: null,
      }),
    );

    return user.toObject();
  }

  public async updateLogin(
    id: number,
    { login: email }: UserUpdateLoginRequestDto,
  ): Promise<UserAuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new ApplicationError({
        message: 'Email is already used!',
      });
    }

    const updatedUser = await this.userRepository.updateLogin(
      UserEntity.initialize({
        id,
        firstName: null,
        lastName: null,
        accountName: null,
        email,
        passwordHash: null,
        passwordSalt: null,
        avatarId: null,
        avatarUrl: null,
        subscriptionId: null,
        subscriptionEndDate: null,
      }),
    );

    return updatedUser.toObject();
  }

  public async findPrivateData(id: number): Promise<UserPrivateData | null> {
    const user = await this.userRepository.find(id);

    if (!user) {
      return null;
    }

    return user.privateData;
  }

  public async updateAvatar(
    id: number,
    avatar: Buffer,
  ): Promise<UserAuthResponse> {
    const { id: avatarId } = await file.upload({ file: avatar });

    const user = await this.userRepository.updateAvatar(
      UserEntity.initialize({
        id,
        avatarId,
        firstName: null,
        lastName: null,
        accountName: null,
        email: null,
        passwordHash: null,
        passwordSalt: null,
        avatarUrl: null,
        subscriptionId: null,
        subscriptionEndDate: null,
      }),
    );

    return user.toObject();
  }

  public async updateSubscription({
    id,
    subscriptionId,
  }: {
    id: number;
    subscriptionId: number;
  }): Promise<UserAuthResponse> {
    const user = await this.userRepository.updateSubscription(
      UserEntity.initialize({
        id,
        subscriptionId,
        avatarId: null,
        firstName: null,
        lastName: null,
        accountName: null,
        email: null,
        passwordHash: null,
        passwordSalt: null,
        avatarUrl: null,
        subscriptionEndDate: null,
      }),
    );

    return user.toObject();
  }
}

export { UserService };
