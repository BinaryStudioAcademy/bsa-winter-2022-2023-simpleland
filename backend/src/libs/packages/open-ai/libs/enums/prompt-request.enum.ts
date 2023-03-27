import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/sections.js';

const PromptRequest: Record<ValueOf<typeof SectionType>, string> = {
  [SectionType.HEADER]:
    'Genearte text logo for header section, phone number for header section.',
  [SectionType.MAIN]:
    'Generate title for main section, description for main section.',
  [SectionType.FOOTER]:
    'Generate logo text for footer section, description for footer section.',
} as const;

export { PromptRequest };
