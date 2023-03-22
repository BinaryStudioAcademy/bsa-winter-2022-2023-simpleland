import { type IService } from '~/libs/interfaces/interfaces.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectRepository } from '~/packages/projects/project.repository.js';

import { ApplicationError } from '../auth/libs/exceptions/exceptions.js';
import {
  type FindProjectByUserIdRequest,
  type ProjectCreateRequestDto,
  type ProjectCreateResponseDto,
  type ProjectGetAllResponseDto,
} from './libs/types/types.js';

class ProjectService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private projectRepository: ProjectRepository;

  public constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository;
  }

  public async findAll(): Promise<ProjectGetAllResponseDto> {
    const items = await this.projectRepository.findAll();

    return {
      items: items.map((project) => project.toObject()),
    };
  }

  public async findByUserId({
    userId,
  }: FindProjectByUserIdRequest): Promise<ProjectGetAllResponseDto> {
    // const items = await this.projectRepository.findByUserId(id);

    const items = await this.projectRepository.findByUserId(userId);

    if (!items) {
      throw new ApplicationError({
        message: 'This User Has No Projects',
      });
    }

    return {
      items: items.map((project) => project.toObject()),
    };
  }

  public async create(
    payload: ProjectCreateRequestDto,
  ): Promise<ProjectCreateResponseDto> {
    const project = await this.projectRepository.create(
      ProjectEntity.initializeNew({
        name: payload.name,
        userId: payload.userId,
      }),
    );

    return project.toObject();
  }
}

export { ProjectService };
