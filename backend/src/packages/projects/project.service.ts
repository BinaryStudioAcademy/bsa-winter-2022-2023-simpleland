import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type File } from '~/libs/packages/file/file.package.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectRepository } from '~/packages/projects/project.repository.js';

import {
  type ProjectCreateDto,
  type ProjectCreateRequestDto,
  type ProjectCreateResponseDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectUpdateResponseDto,
  type ProjectUploadImageParametersDto,
} from './libs/types/types.js';

type Constructor = {
  projectRepository: ProjectRepository;
  file: File;
};

class ProjectService implements Omit<IService, 'update' | 'delete'> {
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
      totalCount: items.length,
    };
  }

  public async find(id: number): Promise<ProjectGetAllItemResponseDto> {
    const project = await this.projectRepository.find(id);

    if (!project) {
      throw new ApplicationError({
        message: `Project with id ${id} not found`,
      });
    }

    return project.toObject();
  }

  public async findByUserId(
    id: number,
    parameters: ProjectFilterQueryDto,
  ): Promise<ProjectGetAllResponseDto> {
    const pageModel = await this.projectRepository.findByUserId(id, parameters);
    const items = pageModel.results.map((project) => {
      return ProjectEntity.initialize({
        id: project.id,
        name: project.name,
        userId: project.userId,
        avatarId: project.avatarId,
        avatarUrl: project.avatar?.url ?? null,
        category: project.category,
      });
    });

    return {
      items: items.map((project) => project.toObject()),
      totalCount: pageModel.total,
    };
  }

  public async create(
    payload: ProjectCreateDto,
  ): Promise<ProjectCreateResponseDto> {
    const project = await this.projectRepository.create(
      ProjectEntity.initializeNew({
        name: payload.name,
        userId: payload.userId,
        category: payload.category,
      }),
    );

    return project.toObject();
  }

  public async update(
    id: number,
    payload: ProjectCreateRequestDto,
  ): Promise<ProjectUpdateResponseDto> {
    const project = await this.projectRepository.update(
      ProjectEntity.initialize({
        id,
        name: payload.name,
        userId: null,
        avatarId: null,
        avatarUrl: null,
        category: payload.category,
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
        category: null,
      }),
    );

    return project.toObject();
  }
}

export { ProjectService };
