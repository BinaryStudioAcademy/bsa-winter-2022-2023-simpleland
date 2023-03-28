import { type ValueOf } from '~/libs/types/value-of.type.js';
import { type SectionType } from '~/packages/sections/libs/enums/enums.js';

type SectionGetAllItemResponseDto<T = unknown> = {
  id: number;
  type: ValueOf<typeof SectionType>;
  content: T;
};

export { type SectionGetAllItemResponseDto };
