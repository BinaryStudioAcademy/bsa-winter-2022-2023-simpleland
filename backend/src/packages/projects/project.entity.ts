import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ProjectCategory } from './libs/enums/enums.js';

class ProjectEntity implements IEntity {
  private 'id': number | null;

  private 'name': string | null;

  private 'userId': number | null;

  private 'avatarId': number | null;

  private 'avatarUrl': string | null;

  private 'category': ValueOf<typeof ProjectCategory> | null;

  private constructor({
    id,
    name,
    userId,
    avatarId,
    avatarUrl,
    category,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    avatarId: number | null;
    avatarUrl: string | null;
    category: ValueOf<typeof ProjectCategory> | null;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.avatarId = avatarId;
    this.avatarUrl = avatarUrl;
    this.category = category;
  }

  public static initialize({
    id,
    name,
    userId,
    avatarId,
    avatarUrl,
    category,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    avatarId: number | null;
    avatarUrl: string | null;
    category: ValueOf<typeof ProjectCategory> | null;
  }): ProjectEntity {
    return new ProjectEntity({
      id,
      name,
      userId,
      avatarId,
      avatarUrl,
      category,
    });
  }

  public static initializeNew({
    name,
    userId,
    category,
  }: {
    name: string;
    userId: number;
    category: ValueOf<typeof ProjectCategory>;
  }): ProjectEntity {
    return new ProjectEntity({
      id: null,
      name,
      userId,
      avatarId: null,
      avatarUrl: null,
      category,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    userId: number;
    avatarUrl: string | null;
    category: ValueOf<typeof ProjectCategory>;
  } {
    return {
      id: this.id as number,
      name: this.name as string,
      userId: this.userId as number,
      avatarUrl: this.avatarUrl,
      category: this.category as ValueOf<typeof ProjectCategory>,
    };
  }

  public toNewObject(): {
    name: string;
    userId: number;
    category: ValueOf<typeof ProjectCategory>;
  } {
    return {
      name: this.name as string,
      userId: this.userId as number,
      category: this.category as ValueOf<typeof ProjectCategory>,
    };
  }

  public toProjectAvatar(): {
    id: number;
    avatarId: number;
  } {
    return {
      id: this.id as number,
      avatarId: this.avatarId as number,
    };
  }
}

export { ProjectEntity };
