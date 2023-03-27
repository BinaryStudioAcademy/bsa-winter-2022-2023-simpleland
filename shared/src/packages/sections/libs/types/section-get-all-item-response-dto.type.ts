import { type ValueOf } from '~/libs/types/value-of.type';
import { type SectionType } from '~/packages/sections/libs/enums/enums.js';

type SectionGetAllItemResponseDto<T = unknown> = {
  id: number;
  name: string;
  type: ValueOf<typeof SectionType>;
  content: T;
};

export { type SectionGetAllItemResponseDto };
