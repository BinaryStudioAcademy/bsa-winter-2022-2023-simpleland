import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/sections.js';

const sectionTypeToPosition: Record<ValueOf<typeof SectionType>, number> = {
  [SectionType.HEADER]: 1,
  [SectionType.MAIN]: 2,
  [SectionType.ABOUT]: 3,
  [SectionType.SERVICE]: 4,
  [SectionType.PORTFOLIO]: 5,
  [SectionType.FEEDBACK]: 6,
  [SectionType.FOOTER]: 7,
};

export { sectionTypeToPosition };
