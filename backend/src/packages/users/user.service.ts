import { type IService } from '~/libs/interfaces/interfaces.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserAuthResponse,
  type UserGetAllResponseDto,
  type UserPrivateData,
  type UserSignUpRequestDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';

class UserService implements Omit<IService, 'find' | 'delete' | 'search'> {
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
      }),
    );

    return user.toObject();
  }

  public async findPrivateData(id: number): Promise<UserPrivateData | null> {
    const user = await this.userRepository.find(id);

    if (!user) {
      return null;
    }

    return user.privateData;
  }
}

export { UserService };
