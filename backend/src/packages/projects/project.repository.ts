import { type Page } from 'objection';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectModel } from '~/packages/projects/project.model.js';

import { type ProjectFilterQueryDto } from './libs/types/types.js';

class ProjectRepository
  implements Omit<IRepository, 'find' | 'update' | 'delete'>
{
  private projectModel: typeof ProjectModel;

  private defaultRelationExpression = 'avatar';

  public constructor(projectModel: typeof ProjectModel) {
    this.projectModel = projectModel;
  }

  public async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.projectModel.query().execute();

    return projects.map((project) => {
      return ProjectEntity.initialize({
        id: project.id,
        name: project.name,
        userId: project.userId,
        avatarId: project.avatarId,
        avatarUrl: project.avatar?.url ?? null,
        category: project.category,
      });
    });
  }

  public async findByUserId(
    id: number,
    { name, page, limit }: ProjectFilterQueryDto,
  ): Promise<Page<ProjectModel>> {
    return await this.projectModel
      .query()
      .where('userId', id)
      .andWhere((builder) => {
        if (name) {
          void builder.where('name', 'ilike', `%${name}%`);
        }
      })
      .orderBy('name')
      .page(page - 1, limit)
      .withGraphFetched(this.defaultRelationExpression)
      .execute();
  }

  public async create(entity: ProjectEntity): Promise<ProjectEntity> {
    const { name, userId, category } = entity.toNewObject();

    const project = await this.projectModel
      .query()
      .insert({
        name,
        userId,
        category,
      })
      .returning('*')
      .execute();

    return ProjectEntity.initialize({
      id: project.id,
      name: project.name,
      userId: project.userId,
      avatarId: project.avatarId,
      avatarUrl: project.avatar?.url ?? null,
      category: project.category,
    });
  }

  public async uploadImage(entity: ProjectEntity): Promise<ProjectEntity> {
    const { id, avatarId } = entity.toProjectAvatar();

    const project = await this.projectModel
      .query()
      .patchAndFetchById(id, { avatarId })
      .withGraphFetched(this.defaultRelationExpression);

    return ProjectEntity.initialize({
      id: project.id,
      name: project.name,
      userId: project.userId,
      avatarId: project.avatarId,
      avatarUrl: project.avatar?.url ?? null,
      category: project.category,
    });
  }
}

export { ProjectRepository };
