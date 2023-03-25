import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type SectionType } from './libs/enums/enums.js';

class SectionEntity implements Omit<IEntity, 'toNewObject'> {
  private 'id': number | null;

  private 'name': string;

  private 'type': ValueOf<typeof SectionType>;

  private 'content': unknown;

  private constructor({
    id,
    name,
    type,
    content,
  }: {
    id: number | null;
    name: string;
    type: ValueOf<typeof SectionType>;
    content: unknown;
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.content = content;
  }

  public static initialize({
    id,
    name,
    type,
    content,
  }: {
    id: number;
    name: string;
    type: ValueOf<typeof SectionType>;
    content: unknown;
  }): SectionEntity {
    return new SectionEntity({ id, name, type, content });
  }

  public toObject(): {
    id: number;
    name: string;
    type: ValueOf<typeof SectionType>;
    content: unknown;
  } {
    return {
      id: this.id as number,
      name: this.name,
      type: this.type,
      content: this.content,
    };
  }
}

export { SectionEntity };
