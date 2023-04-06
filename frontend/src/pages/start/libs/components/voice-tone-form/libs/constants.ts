import { type SelectOption, type ValueOf } from '~/libs/types/types.js';
import {
  type SiteCreateStepTone,
  SiteToneType,
} from '~/packages/sites/sites.js';

import { siteToneTypeToReadable } from './maps/maps.js';

const OPTIONS: SelectOption<ValueOf<typeof SiteToneType>>[] = Object.values(
  SiteToneType,
).map((it) => ({
  value: it,
  label: siteToneTypeToReadable[it],
}));

const DEFAULT_FORM_PAYLOAD: SiteCreateStepTone = {
  tone: SiteToneType.OFFICIAL,
} as const;

export { DEFAULT_FORM_PAYLOAD, OPTIONS };
