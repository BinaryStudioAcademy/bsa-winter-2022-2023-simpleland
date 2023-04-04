import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ProjectType } from './libs/enums/enums.js';

class ProjectEntity implements IEntity {
  private 'id': number | null;

  private 'name': string | null;

  private 'userId': number | null;

  private 'avatarId': number | null;

  private 'avatarUrl': string | null;

  private 'type': ValueOf<typeof ProjectType>;

  private constructor({
    id,
    name,
    userId,
    avatarId,
    avatarUrl,
    type,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    avatarId: number | null;
    avatarUrl: string | null;
    type: ValueOf<typeof ProjectType>;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.avatarId = avatarId;
    this.avatarUrl = avatarUrl;
    this.type = type;
  }

  public static initialize({
    id,
    name,
    userId,
    avatarId,
    avatarUrl,
    type,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    avatarId: number | null;
    avatarUrl: string | null;
    type: ValueOf<typeof ProjectType>;
  }): ProjectEntity {
    return new ProjectEntity({
      id,
      name,
      userId,
      avatarId,
      avatarUrl,
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
      avatarId: null,
      avatarUrl: null,
      type,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    userId: number;
    avatarUrl: string | null;
    type: ValueOf<typeof ProjectType>;
  } {
    return {
      id: this.id as number,
      name: this.name as string,
      userId: this.userId as number,
      avatarUrl: this.avatarUrl,
      type: this.type,
    };
  }

  public toNewObject(): {
    name: string;
    userId: number;
    type: ValueOf<typeof ProjectType>;
  } {
    return {
      name: this.name as string,
      userId: this.userId as number,
    };
  }

  public toProjectAvatar(): {
    id: number;
    avatarId: number;
  } {
    return {
      id: this.id as number,
      avatarId: this.avatarId as number,
      type: this.type,
    };
  }
}

export { ProjectEntity };
