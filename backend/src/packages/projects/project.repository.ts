import { SortDirection } from '~/libs/enums/enums.js';
import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectModel } from '~/packages/projects/project.model.js';

import { type ProjectFilterQueryDto } from './libs/types/types.js';

class ProjectRepository implements Omit<IRepository, 'update' | 'delete'> {
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

  public async find(id: number): Promise<ProjectEntity | null> {
    const project = await this.projectModel
      .query()
      .findById(id)
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    if (!project) {
      return null;
    }

    return ProjectEntity.initialize({
      id: project.id,
      name: project.name,
      userId: project.userId,
      avatarId: project.avatarId,
      avatarUrl: project.avatar?.url ?? null,
      category: project.category,
    });
  }

  public async findByUserId(
    id: number,
    { name, page, limit }: ProjectFilterQueryDto,
  ): Promise<{
    totalCount: number;
    items: ProjectEntity[];
  }> {
    const offset = page - 1;

    const { total, results } = await this.projectModel
      .query()
      .where('userId', id)
      .andWhere((builder) => {
        if (name) {
          void builder.where('name', 'ilike', `%${name}%`);
        }
      })
      .orderBy('created_at', SortDirection.DESCENDING)
      .page(offset, limit)
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return {
      totalCount: total,
      items: results.map((project) => {
        return ProjectEntity.initialize({
          id: project.id,
          name: project.name,
          userId: project.userId,
          avatarId: project.avatarId,
          avatarUrl: project.avatar?.url ?? null,
          category: project.category,
        });
      }),
    };
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

  public async update(entity: ProjectEntity): Promise<ProjectEntity> {
    const { id, name, category } = entity.toObject();

    const project = await this.projectModel
      .query()
      .patchAndFetchById(id, {
        name,
        category,
      })
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
