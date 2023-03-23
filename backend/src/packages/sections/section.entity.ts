import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SectionEntity implements Omit<IEntity, 'toNewObject'> {
  private 'id': number | null;

  private 'name': string;

  private 'content': string;

  private constructor({
    id,
    name,
    content,
  }: {
    id: number | null;
    name: string;
    content: string;
  }) {
    this.id = id;
    this.name = name;
    this.content = content;
  }

  public static initialize({
    id,
    name,
    content,
  }: {
    id: number;
    name: string;
    content: string;
  }): SectionEntity {
    return new SectionEntity({ id, name, content });
  }

  public toObject(): { id: number; name: string; content: string } {
    return {
      id: this.id as number,
      name: this.name,
      content: this.content,
    };
  }
}

export { SectionEntity };
