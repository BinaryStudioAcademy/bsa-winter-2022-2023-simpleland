import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/libs/enums/enums.js';

const SectionTypeToPrompt: Record<
  ValueOf<typeof SectionType>,
  { EXAMPLE: string; REQUEST: string }
> = {
  [SectionType.HEADER]: {
    EXAMPLE: 'logo: id Studio\nphone: (303)555-0105',
    REQUEST:
      'Genearte text logo for header section, phone number for header section.',
  },
  [SectionType.MAIN]: {
    EXAMPLE:
      'title: We create your space better\ndescription: Our team creates comfortable spaces for our clients. We’ve been designing your everyday life and work through great ideas since 1999.',
    REQUEST: 'Generate title for main section, description for main section.',
  },
  [SectionType.FOOTER]: {
    EXAMPLE:
      'logo: id Studio\ndescription: We are one of the leading interior design and remodeling studios available for all of your residential and commercial interior design needs.',
    REQUEST:
      'Generate logo text for footer section, description for footer section.',
  },
} as const;

export { SectionTypeToPrompt };
