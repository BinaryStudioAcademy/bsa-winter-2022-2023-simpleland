import {
  type SiteCreateRequestDto,
  SiteToneType,
} from '~/packages/sites/sites.js';

const ONE_STEP_LENGTH = 1 as const;

const DEFAULT_SITE_PAYLOAD: SiteCreateRequestDto = {
  name: '',
  industry: '',
  tone: SiteToneType.OFFICIAL,
  targetAudience: [],
};

export { DEFAULT_SITE_PAYLOAD, ONE_STEP_LENGTH };
