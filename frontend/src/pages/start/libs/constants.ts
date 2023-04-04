import { type SiteCreateRequestDto } from '~/packages/sites/sites.js';

const ONE_STEP_LENGTH = 1 as const;

const DEFAULT_SITE_PAYLOAD: SiteCreateRequestDto = {
  name: '',
  industry: 'Programming courses', // TODO: replace
  tone: '',
} as const;

export { DEFAULT_SITE_PAYLOAD, ONE_STEP_LENGTH };
