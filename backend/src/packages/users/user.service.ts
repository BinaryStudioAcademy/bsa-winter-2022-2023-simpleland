import { type IService } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserGetAllResponseDto,
  type UserRegisterResponse,
  type UserSignUpRequestDto,
} from './libs/types/types.js';

class UserService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async find(payload: string): ReturnType<IService['find']> {
    return await this.userRepository.find(payload);
  }

  public async findAll(): Promise<UserGetAllResponseDto> {
    const items = await this.userRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserRegisterResponse> {
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
}

export { UserService };
