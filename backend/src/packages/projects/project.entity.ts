import { type IEntity } from '~/libs/interfaces/interfaces.js';

class ProjectEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'userId': number;

  private constructor({
    id,
    name,
    userId,
  }: {
    id: number | null;
    name: string;
    userId: number;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

  public static initialize({
    id,
    name,
    userId,
  }: {
    id: number;
    name: string;
    userId: number;
  }): ProjectEntity {
    return new ProjectEntity({
      id,
      name,
      userId,
    });
  }

  public static initializeNew({
    name,
    userId,
  }: {
    name: string;
    userId: number;
  }): ProjectEntity {
    return new ProjectEntity({
      id: null,
      name,
      userId,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    userId: number;
  } {
    return {
      id: this.id as number,
      name: this.name,
      userId: this.userId,
    };
  }

  public toNewObject(): {
    name: string;
    userId: number;
  } {
    return {
      name: this.name,
      userId: this.userId,
    };
  }
}

export { ProjectEntity };
