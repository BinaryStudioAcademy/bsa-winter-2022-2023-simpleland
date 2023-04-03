import { type SiteCreateIndustryName } from '~/packages/sites/sites.js';

const DEFAULT_STEP_PAYLOAD: SiteCreateIndustryName = {
  selectIndustry: '',
  enterIndustry: '',
} as const;

export { DEFAULT_STEP_PAYLOAD };
