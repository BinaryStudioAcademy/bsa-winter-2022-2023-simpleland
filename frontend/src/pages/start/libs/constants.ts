import {
  type SiteCreateRequestDto,
  SiteTargetType,
  SiteToneType,
} from '~/packages/sites/sites.js';

const ONE_STEP_LENGTH = 1 as const;

const FORM_STEPPER_ID = 'stepperForm' as const;

const DEFAULT_SITE_PAYLOAD: SiteCreateRequestDto = {
  name: '',
  industry: '',
  tone: SiteToneType.OFFICIAL,
  targetAudience: SiteTargetType.YOUNG_ADULT,
};

export { DEFAULT_SITE_PAYLOAD, FORM_STEPPER_ID, ONE_STEP_LENGTH };
