import { type IService } from '~/libs/interfaces/interfaces.js';
import { type File } from '~/libs/packages/file/file.package.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectRepository } from '~/packages/projects/project.repository.js';

import {
  type ProjectCreateDto,
  type ProjectCreateResponseDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectUploadImageParametersDto,
} from './libs/types/types.js';

type Constructor = {
  projectRepository: ProjectRepository;
  file: File;
};

class ProjectService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private projectRepository: ProjectRepository;

  private file: File;

  public constructor({ projectRepository, file }: Constructor) {
    this.projectRepository = projectRepository;
    this.file = file;
  }

  public async findAll(): Promise<ProjectGetAllResponseDto> {
    const items = await this.projectRepository.findAll();

    return {
      items: items.map((project) => project.toObject()),
    };
  }

  public async findByUserId(
    id: number,
    parameters: ProjectFilterQueryDto,
  ): Promise<ProjectGetAllResponseDto> {
    const items = await this.projectRepository.findByUserId(id, parameters);

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
        type: payload.type,
      }),
    );

    return project.toObject();
  }

  public async uploadImage(
    id: number,
    parameters: ProjectUploadImageParametersDto,
    avatar: Buffer,
  ): Promise<ProjectGetAllItemResponseDto> {
    const projectId = +parameters.projectId;
    const { id: avatarId } = await this.file.upload({ file: avatar });

    const project = await this.projectRepository.uploadImage(
      ProjectEntity.initialize({
        id: projectId,
        avatarId,
        name: null,
        userId: id,
        avatarUrl: null,
      }),
    );

    return project.toObject();
  }
}

export { ProjectService };
