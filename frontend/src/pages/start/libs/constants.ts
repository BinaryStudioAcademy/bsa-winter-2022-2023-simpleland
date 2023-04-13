import {
  type SiteCreateRequestDto,
  SiteTargetType,
  SiteToneType,
} from '~/packages/sites/sites.js';

const ONE_STEP_LENGTH = 1 as const;

const STEPS_FORM_SUBMIT_ID = 'stepperForm' as const;

const DEFAULT_SITE_PAYLOAD: SiteCreateRequestDto = {
  name: '',
  industry: '',
  tone: SiteToneType.OFFICIAL,
  targetAudience: SiteTargetType.YOUNG_ADULT,
};

export { DEFAULT_SITE_PAYLOAD, ONE_STEP_LENGTH, STEPS_FORM_SUBMIT_ID };
