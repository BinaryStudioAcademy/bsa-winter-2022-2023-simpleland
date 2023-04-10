import { type ValueOf } from '~/libs/types/value-of.type';
import { type SectionType } from '~/packages/sections/libs/enums/enums.js';

type SectionUpdateRequestDto = {
  content: unknown;
  type: ValueOf<typeof SectionType>;
};

export { type SectionUpdateRequestDto };
