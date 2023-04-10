import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/sections.js';

const navigationSections: ValueOf<typeof SectionType>[] = [
  SectionType.PORTFOLIO,
  SectionType.ABOUT,
  SectionType.SERVICE,
  SectionType.FEEDBACK,
];

export { navigationSections };
