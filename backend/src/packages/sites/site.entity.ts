import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SiteEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'projectId': number;

  private 'publishedUrl': string | null;

  private constructor({
    id,
    name,
    publishedUrl,
    projectId,
  }: {
    id: number | null;
    name: string;
    publishedUrl: string | null;
    projectId: number;
  }) {
    this.id = id;
    this.name = name;
    this.publishedUrl = publishedUrl;
    this.projectId = projectId;
  }

  public static initialize({
    id,
    name,
    projectId,
    publishedUrl,
  }: {
    id: number;
    name: string;
    publishedUrl: string | null;
    projectId: number;
  }): SiteEntity {
    return new SiteEntity({
      id,
      name,
      projectId,
      publishedUrl,
    });
  }

  public static initializeNew({
    name,
    projectId,
  }: {
    name: string;
    projectId: number;
  }): SiteEntity {
    return new SiteEntity({
      id: null,
      publishedUrl: null,
      projectId,
      name,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    publishedUrl: string | null;
    projectId: number;
  } {
    return {
      id: this.id as number,
      name: this.name,
      publishedUrl: this.publishedUrl,
      projectId: this.projectId,
    };
  }

  public toNewObject(): {
    name: string;
    projectId: number;
  } {
    return {
      name: this.name,
      projectId: this.projectId,
    };
  }
}

export { SiteEntity };
