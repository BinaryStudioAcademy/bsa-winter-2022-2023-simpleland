import { type SelectOption, type ValueOf } from '~/libs/types/types.js';
import {
  type SiteCreateStepTone,
  SiteToneType,
} from '~/packages/sites/sites.js';

import { SiteToneTypeToReadable } from './site-tone-type-to-readable.enum.js';

const OPTIONS: SelectOption<ValueOf<typeof SiteToneType>>[] = Object.values(
  SiteToneType,
).map((it) => ({
  value: it,
  label: SiteToneTypeToReadable[it],
}));

const defaultPayload: SiteCreateStepTone = {
  tone: SiteToneType.OFFICIAL,
} as const;

export { defaultPayload, OPTIONS };
