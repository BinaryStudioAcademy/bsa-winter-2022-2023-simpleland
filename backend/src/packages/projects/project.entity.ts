import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ProjectType } from './libs/enums/enums.js';

class ProjectEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'userId': number;

  private 'type': ValueOf<typeof ProjectType>;

  private constructor({
    id,
    name,
    userId,
    type,
  }: {
    id: number | null;
    name: string;
    userId: number;
    type: ValueOf<typeof ProjectType>;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.type = type;
  }

  public static initialize({
    id,
    name,
    userId,
    type,
  }: {
    id: number;
    name: string;
    userId: number;
    type: ValueOf<typeof ProjectType>;
  }): ProjectEntity {
    return new ProjectEntity({
      id,
      name,
      userId,
      type,
    });
  }

  public static initializeNew({
    name,
    userId,
    type,
  }: {
    name: string;
    userId: number;
    type: ValueOf<typeof ProjectType>;
  }): ProjectEntity {
    return new ProjectEntity({
      id: null,
      name,
      userId,
      type,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    userId: number;
    type: ValueOf<typeof ProjectType>;
  } {
    return {
      id: this.id as number,
      name: this.name,
      userId: this.userId,
      type: this.type,
    };
  }

  public toNewObject(): {
    name: string;
    userId: number;
    type: ValueOf<typeof ProjectType>;
  } {
    return {
      name: this.name,
      userId: this.userId,
      type: this.type,
    };
  }
}

export { ProjectEntity };
