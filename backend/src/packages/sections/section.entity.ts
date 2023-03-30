import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type SectionType } from './libs/enums/enums.js';

class SectionEntity implements IEntity {
  private 'id': number | null;

  private 'type': ValueOf<typeof SectionType>;

  private 'content': unknown;

  private constructor({
    id,
    type,
    content,
  }: {
    id: number | null;
    type: ValueOf<typeof SectionType>;
    content: unknown;
  }) {
    this.id = id;
    this.type = type;
    this.content = content;
  }

  public static initialize({
    id,
    type,
    content,
  }: {
    id: number;
    type: ValueOf<typeof SectionType>;
    content: unknown;
  }): SectionEntity {
    return new SectionEntity({ id, type, content });
  }

  public static initializeNew({
    type,
    content,
  }: {
    type: ValueOf<typeof SectionType>;
    content: unknown;
  }): SectionEntity {
    return new SectionEntity({
      id: null,
      type,
      content,
    });
  }

  public toObject(): {
    id: number;
    type: ValueOf<typeof SectionType>;
    content: unknown;
  } {
    return {
      id: this.id as number,
      type: this.type,
      content: this.content,
    };
  }

  public toNewObject(): {
    type: ValueOf<typeof SectionType>;
    content: unknown;
  } {
    return {
      type: this.type,
      content: this.content,
    };
  }
}

export { SectionEntity };
