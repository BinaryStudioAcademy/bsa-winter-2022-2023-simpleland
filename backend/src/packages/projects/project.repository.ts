import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { ProjectEntity } from '~/packages/projects/project.entity.js';
import { type ProjectModel } from '~/packages/projects/project.model.js';

import { type ProjectFilterQueryDto } from './libs/types/types.js';

class ProjectRepository
  implements Omit<IRepository, 'find' | 'update' | 'delete'>
{
  private projectModel: typeof ProjectModel;

  public constructor(projectModel: typeof ProjectModel) {
    this.projectModel = projectModel;
  }

  public async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.projectModel.query().execute();

    return projects.map((project) => ProjectEntity.initialize(project));
  }

  public async findByUserId(
    id: number,
    { name }: ProjectFilterQueryDto,
  ): Promise<ProjectEntity[]> {
    const projects = await this.projectModel
      .query()
      .where('userId', id)
      .andWhere((builder) => {
        if (name) {
          void builder.where('name', 'ilike', `%${name}%`);
        }
      });

    return projects.map((project) => ProjectEntity.initialize(project));
  }

  public async create(entity: ProjectEntity): Promise<ProjectEntity> {
    const { name, userId } = entity.toNewObject();

    const project = await this.projectModel
      .query()
      .insert({
        name,
        userId,
      })
      .returning('*')
      .execute();

    return ProjectEntity.initialize({
      id: project.id,
      name: project.name,
      userId: project.userId,
    });
  }
}

export { ProjectRepository };
