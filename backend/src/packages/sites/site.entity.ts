import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SiteEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'publishedUrl': string | null;

  private constructor({
    id,
    name,
    publishedUrl,
  }: {
    id: number | null;
    name: string;
    publishedUrl: string | null;
  }) {
    this.id = id;
    this.name = name;
    this.publishedUrl = publishedUrl;
  }

  public static initialize({
    id,
    name,
    publishedUrl,
  }: {
    id: number;
    name: string;
    publishedUrl: string | null;
  }): SiteEntity {
    return new SiteEntity({ id, name, publishedUrl });
  }

  public static initializeNew({ name }: { name: string }): SiteEntity {
    return new SiteEntity({
      id: null,
      publishedUrl: null,
      name,
    });
  }

  public toObject(): { id: number; name: string; publishedUrl: string | null } {
    return {
      id: this.id as number,
      name: this.name,
      publishedUrl: this.publishedUrl,
    };
  }

  public toNewObject(): { name: string } {
    return {
      name: this.name,
    };
  }
}

export { SiteEntity };
