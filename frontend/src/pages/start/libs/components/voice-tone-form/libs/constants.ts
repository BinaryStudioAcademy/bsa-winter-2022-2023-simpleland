import { type SelectOption } from '~/libs/types/types.js';
import { SiteToneType } from '~/packages/sites/libs/enums/enums.js';
import { type SiteCreateStepTone } from '~/packages/sites/libs/types/types.js';

const options: SelectOption<string | number>[] = [
  { value: SiteToneType.OFFICIAL, label: 'Official' },
  { value: SiteToneType.NOT_OFFICIAL, label: 'Not official' },
];

const defaultPayload: SiteCreateStepTone = {
  tone: SiteToneType.OFFICIAL,
} as const;

export { defaultPayload, options };
