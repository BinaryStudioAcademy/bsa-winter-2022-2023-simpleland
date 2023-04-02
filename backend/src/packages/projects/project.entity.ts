import { type IEntity } from '~/libs/interfaces/interfaces.js';

class ProjectEntity implements IEntity {
  private 'id': number | null;

  private 'name': string | null;

  private 'userId': number | null;

  private 'imageId': number | null;

  private 'imageUrl': string | null;

  private constructor({
    id,
    name,
    userId,
    imageId,
    imageUrl,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    imageId: number | null;
    imageUrl: string | null;
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.imageId = imageId;
    this.imageUrl = imageUrl;
  }

  public static initialize({
    id,
    name,
    userId,
    imageId,
    imageUrl,
  }: {
    id: number | null;
    name: string | null;
    userId: number | null;
    imageId: number | null;
    imageUrl: string | null;
  }): ProjectEntity {
    return new ProjectEntity({
      id,
      name,
      userId,
      imageId,
      imageUrl,
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
      imageId: null,
      imageUrl: null,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    userId: number;
    imageUrl: string | null;
  } {
    return {
      id: this.id as number,
      name: this.name as string,
      userId: this.userId as number,
      imageUrl: this.imageUrl,
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

  public toUserImage(): {
    id: number;
    imageId: number;
  } {
    return {
      id: this.id as number,
      imageId: this.imageId as number,
    };
  }
}

export { ProjectEntity };
