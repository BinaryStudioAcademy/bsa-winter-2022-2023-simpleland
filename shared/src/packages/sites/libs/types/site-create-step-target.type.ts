import { type ValueOf } from '~/libs/types/value-of.type';
import { type SiteTargetType } from '~/packages/sites/libs/enums/enums.js';

type SiteCreateStepTarget = {
  targetAudience: ValueOf<typeof SiteTargetType>;
};
export { type SiteCreateStepTarget };
