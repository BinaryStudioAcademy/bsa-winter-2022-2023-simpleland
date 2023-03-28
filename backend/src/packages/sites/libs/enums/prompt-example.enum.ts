import { type ValueOf } from '~/libs/types/types.js';
import { type SectionType } from '~/packages/sections/sections.js';

const PromptExample: Record<ValueOf<typeof SectionType>, string> = {
  'header': 'logo: id Studio\nphone: (303)555-0105',
  'main':
    'title: We create your space better\ndescription: Our team creates comfortable spaces for our clients. We’ve been designing your everyday life and work through great ideas since 1999.',
  'footer':
    'logo: id Studio\ndescription: We are one of the leading interior design and remodeling studios available for all of your residential and commercial interior design needs.',
} as const;

export { PromptExample };
