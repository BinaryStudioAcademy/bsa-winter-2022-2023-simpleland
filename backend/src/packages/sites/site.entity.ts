import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SiteEntity implements Omit<IEntity, 'toNewObject'> {
  private 'id': number;

  private 'name': string;

  private 'publishedUrl': string | null;

  private constructor({
    id,
    name,
    publishedUrl,
  }: {
    id: number;
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

  public toObject(): { id: number; name: string; publishedUrl: string | null } {
    return {
      id: this.id,
      name: this.name,
      publishedUrl: this.publishedUrl,
    };
  }
}

export { SiteEntity };
