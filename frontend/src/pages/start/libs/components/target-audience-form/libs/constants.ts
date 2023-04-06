import { type SelectOption, type ValueOf } from '~/libs/types/types.js';
import {
  type SiteCreateStepTarget,
  SiteTargetType,
} from '~/packages/sites/sites.js';

import { siteTargetTypeToReadable } from './maps/maps.js';

const DEFAULT_STEP_TARGET_VALUE: SiteCreateStepTarget = {
  targetAudience: SiteTargetType.YOUNG_ADULT,
};

const OPTIONS: SelectOption<ValueOf<typeof SiteTargetType>>[] = Object.values(
  SiteTargetType,
).map((it) => ({
  value: it,
  label: siteTargetTypeToReadable[it],
}));

export { DEFAULT_STEP_TARGET_VALUE, OPTIONS };
