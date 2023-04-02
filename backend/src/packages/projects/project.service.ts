import { type ProjectGetAllItemResponseDto } from 'shared/build/packages/projects/projects.js';

import { type IService } from '~/libs/interfaces/interfaces.js';
import { file } from '~/libs/packages/file/file.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectRepository } from '~/packages/projects/project.repository.js';

import {
  type ProjectCreateDto,
  type ProjectCreateResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectUploadImageRequstDto,
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

  public async findByUserId(id: number): Promise<ProjectGetAllResponseDto> {
    const items = await this.projectRepository.findByUserId(id);

    return {
      items: items.map((project) => project.toObject()),
    };
  }

  public async create(
    payload: ProjectCreateDto,
  ): Promise<ProjectCreateResponseDto> {
    const project = await this.projectRepository.create(
      ProjectEntity.initializeNew({
        name: payload.name,
        userId: payload.userId,
      }),
    );

    return project.toObject();
  }

  public async updateImage(
    id: number,
    body: ProjectUploadImageRequstDto,
    image: Buffer,
  ): Promise<ProjectGetAllItemResponseDto> {
    const projectId = +body.project_id.value;
    const { id: imageId } = await file.upload({ file: image });

    const project = await this.projectRepository.updateImage(
      ProjectEntity.initialize({
        id: projectId,
        imageId,
        name: null,
        userId: id,
        imageUrl: null,
      }),
    );

    return project.toObject();
  }
}

export { ProjectService };
