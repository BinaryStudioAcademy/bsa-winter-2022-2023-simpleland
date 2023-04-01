import { type IEntity } from '~/libs/interfaces/interfaces.js';

class FileEntity implements IEntity {
  private 'id': number | null;

  private 'url': string | null;

  private constructor({ id, url }: { id: number | null; url: string | null }) {
    this.id = id;
    this.url = url;
  }

  public static initialize({
    id,
    url,
  }: {
    id: number;
    url: string;
  }): FileEntity {
    return new FileEntity({ id, url });
  }

  public static initializeNew({ url }: { url: string }): FileEntity {
    return new FileEntity({
      id: null,
      url,
    });
  }

  public toObject(): {
    id: number;
    url: string;
  } {
    return {
      id: this.id as number,
      url: this.url as string,
    };
  }

  public toNewObject(): {
    url: string;
  } {
    return {
      url: this.url as string,
    };
  }
}

export { FileEntity };
