import { type SiteCreateStepTarget } from '~/packages/sites/sites.js';

const DEFAULT_STEP_TARGET_VALUE: SiteCreateStepTarget = {
  targetAudience: [],
};

const options = [
  { value: 'kids', label: 'Kids 8-14' },
  { value: 'teenager', label: 'Teenager 14-18' },
  { value: 'young-adult', label: 'Young adult 18-35' },
  { value: 'adult', label: 'Adult 35-65' },
  { value: 'elderly', label: 'Elderly 65-99' },
];

export { options };
export { DEFAULT_STEP_TARGET_VALUE };
