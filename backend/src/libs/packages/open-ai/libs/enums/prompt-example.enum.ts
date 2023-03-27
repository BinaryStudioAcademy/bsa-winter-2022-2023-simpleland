import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/sections.js';

const PromptExample: Record<ValueOf<typeof SectionType>, string> = {
  [SectionType.HEADER]: 'logo: id Studio\nphone: (303)555-0105',
  [SectionType.MAIN]:
    'title: We create your space better\ndescription: Our team creates comfortable spaces for our clients. We’ve been designing your everyday life and work through great ideas since 1999.',
  [SectionType.FOOTER]:
    'logo: id Studio\ndescription: We are one of the leading interior design and remodeling studios available for all of your residential and commercial interior design needs.',
} as const;

export { PromptExample };
