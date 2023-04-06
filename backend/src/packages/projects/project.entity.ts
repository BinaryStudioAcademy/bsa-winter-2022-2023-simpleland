import { type IEntity } from '~/libs/interfaces/interfaces.js';

class ProjectEntity implements IEntity {
  private 'id': number | null;

  private 'name': string | null;

  private 'userId': number | null;

  private 'avatarId': number | null;

  private 'avatarUrl': string | null;

  private constructor({
    id,
    name,
    userId,
    avatarId,
    avatarUrl,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    avatarId: number | null;
    avatarUrl: string | null;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.avatarId = avatarId;
    this.avatarUrl = avatarUrl;
  }

  public static initialize({
    id,
    name,
    userId,
    avatarId,
    avatarUrl,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    avatarId: number | null;
    avatarUrl: string | null;
  }): ProjectEntity {
    return new ProjectEntity({
      id,
      name,
      userId,
      avatarId,
      avatarUrl,
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
      avatarId: null,
      avatarUrl: null,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    userId: number;
    avatarUrl: string | null;
  } {
    return {
      id: this.id as number,
      name: this.name as string,
      userId: this.userId as number,
      avatarUrl: this.avatarUrl,
    };
  }

  public toNewObject(): {
    name: string;
    userId: number;
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
    };
  }
}

export { ProjectEntity };
