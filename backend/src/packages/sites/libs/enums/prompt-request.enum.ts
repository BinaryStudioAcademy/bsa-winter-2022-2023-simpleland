import { type ValueOf } from '~/libs/types/types.js';
import { type SectionType } from '~/packages/sections/sections.js';

const PromptRequest: Record<ValueOf<typeof SectionType>, string> = {
  'header':
    'Genearte text logo for header section, phone number for header section.',
  'main': 'Generate title for main section, description for main section.',
  'footer':
    'Generate logo text for footer section, description for footer section.',
} as const;

export { PromptRequest };
