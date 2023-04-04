import { type SelectOption } from '~/libs/types/types.js';
import { type SiteCreateStepTone } from '~/packages/sites/libs/types/types.js';

const OPTIONS_VALUE: SelectOption<string | number>[] = [
  { value: 'official', label: 'Official' },
  { value: 'notOfficial', label: 'not official' },
];

const DEFAULT_STEP_PAYLOAD: SiteCreateStepTone = {
  tone: '',
} as const;

export { DEFAULT_STEP_PAYLOAD, OPTIONS_VALUE };
