import { type IService } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserAuthResponse,
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserUpdateDetailsRequestDto,
} from './libs/types/types.js';

class UserService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
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
    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        passwordSalt: 'SALT', // TODO
        passwordHash: 'HASH', // TODO
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    );

    return user.toObject();
  }

  public async updateUserDetails(
    id: number,
    payload: UserUpdateDetailsRequestDto,
  ): Promise<UserAuthResponse> {
    const user = await this.userRepository.updateUserDetails(
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
}

export { UserService };
