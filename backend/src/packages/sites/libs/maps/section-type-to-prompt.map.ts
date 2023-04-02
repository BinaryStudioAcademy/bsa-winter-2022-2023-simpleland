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
  [SectionType.FEEDBACK]: {
    EXAMPLE:
      'name: Annette Black\nphotoDescription: The woman in the photo has long, wavy hair and bright green eyes that sparkle with kindness. She is dressed in a flowing floral dress, standing in a lush green field with a peaceful and contented demeanor.\nprofession: Merchandising Associate\nfeedback: This interior design company offers impressive designs that are both practical and imaginative. They have a reliable team and a strong portfolio that demonstrates their skill in creating beautiful spaces. Highly recommended.',
    REQUEST:
      'Generate name for feedback section, photoDescription for feedback section, profession for feedback section, feedback for feedback section',
  },
} as const;

export { SectionTypeToPrompt };
