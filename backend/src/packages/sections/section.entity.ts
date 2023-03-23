import { type IEntity } from '~/libs/interfaces/interfaces.js';

import { type SectionName } from './libs/types/types.js';

class SectionEntity implements Omit<IEntity, 'toNewObject'> {
  private 'id': number | null;

  private 'name': SectionName;

  private 'content': unknown;

  private constructor({
    id,
    name,
    content,
  }: {
    id: number | null;
    name: SectionName;
    content: unknown;
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
    name: SectionName;
    content: unknown;
  }): SectionEntity {
    return new SectionEntity({ id, name, content });
  }

  public toObject(): { id: number; name: SectionName; content: unknown } {
    return {
      id: this.id as number,
      name: this.name,
      content: this.content,
    };
  }
}

export { SectionEntity };
