import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SiteEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'projectId': number;

  private 'publishedUrl': string | null;

  private 'image': string | null;

  private 'userId': number | null;

  private constructor({
    id,
    name,
    publishedUrl,
    projectId,
    image,
    userId,
  }: {
    id: number | null;
    name: string;
    publishedUrl: string | null;
    projectId: number;
    image: string | null;
    userId: number | null;
  }) {
    this.id = id;
    this.name = name;
    this.publishedUrl = publishedUrl;
    this.projectId = projectId;
    this.image = image;
    this.userId = userId;
  }

  public static initialize({
    id,
    name,
    projectId,
    publishedUrl,
    image,
    userId,
  }: {
    id: number;
    name: string;
    publishedUrl: string | null;
    projectId: number;
    image: string | null;
    userId: number | null;
  }): SiteEntity {
    return new SiteEntity({
      id,
      name,
      projectId,
      publishedUrl,
      image,
      userId,
    });
  }

  public static initializeNew({
    name,
    projectId,
    image,
  }: {
    name: string;
    projectId: number;
    image: string | null;
  }): SiteEntity {
    return new SiteEntity({
      id: null,
      publishedUrl: null,
      projectId,
      name,
      image,
      userId: null,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    publishedUrl: string | null;
    projectId: number;
    image: string | null;
    userId: number;
  } {
    return {
      id: this.id as number,
      name: this.name,
      publishedUrl: this.publishedUrl,
      projectId: this.projectId,
      image: this.image,
      userId: this.userId as number,
    };
  }

  public toNewObject(): {
    name: string;
    projectId: number;
    image: string | null;
  } {
    return {
      name: this.name,
      projectId: this.projectId,
      image: this.image,
    };
  }
}

export { SiteEntity };
