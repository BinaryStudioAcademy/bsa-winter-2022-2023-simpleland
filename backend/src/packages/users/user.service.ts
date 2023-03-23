import bcrypt  from 'bcrypt';

import { type IService } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
} from './libs/types/types.js';

interface UserAuthResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
}

const SALT_ROUNDS = 5;

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

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserAuthResponse> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        passwordSalt: salt,
        passwordHash: hashedPassword,
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    );
    return user.toObject();
  }
}

export { UserService };
