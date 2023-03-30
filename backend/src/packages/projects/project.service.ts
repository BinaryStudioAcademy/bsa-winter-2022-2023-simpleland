import { type IService } from '~/libs/interfaces/interfaces.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectRepository } from '~/packages/projects/project.repository.js';

import {
  type ProjectCreateRequestDto,
  type ProjectCreateResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectSearchParameters,
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

  public async findByUserId(
    id: number,
    parameters: ProjectSearchParameters,
  ): Promise<ProjectGetAllResponseDto> {
    const items = await this.projectRepository.findByUserId(id, parameters);

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
