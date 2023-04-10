import { SectionType } from '~/packages/sections/sections.js';

const NAVIGATION_SECTION_TYPES = [
  SectionType.PORTFOLIO,
  SectionType.ABOUT,
  SectionType.SERVICE,
  SectionType.FEEDBACK,
] as const;

export { NAVIGATION_SECTION_TYPES };
