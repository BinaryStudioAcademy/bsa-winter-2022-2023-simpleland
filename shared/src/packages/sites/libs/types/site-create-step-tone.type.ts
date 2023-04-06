import { type ValueOf } from '~/libs/types/value-of.type';
import { type SiteToneType } from '~/packages/sites/libs/enums/enums.js';

type SiteCreateStepTone = {
  tone: ValueOf<typeof SiteToneType>;
};

export { type SiteCreateStepTone };
