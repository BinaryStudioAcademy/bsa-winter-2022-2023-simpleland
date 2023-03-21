import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SiteEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'publishedUrl': string | null;

  private 'projectId': number;

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
    publishedUrl,
    projectId,
  }: {
    id: number;
    name: string;
    publishedUrl: string | null;
    projectId: number;
  }): SiteEntity {
    return new SiteEntity({ id, name, publishedUrl, projectId });
  }

  public static initializeNew({
    name,
    publishedUrl,
    projectId,
  }: {
    name: string;
    publishedUrl: string | null;
    projectId: number;
  }): SiteEntity {
    return new SiteEntity({
      id: null,
      name,
      publishedUrl,
      projectId,
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
    publishedUrl: string | null;
    projectId: number;
  } {
    return {
      name: this.name,
      publishedUrl: this.publishedUrl,
      projectId: this.projectId,
    };
  }
}

export { SiteEntity };
