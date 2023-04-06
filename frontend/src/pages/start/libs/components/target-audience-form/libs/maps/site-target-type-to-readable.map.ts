import { SiteTargetType } from '~/packages/sites/libs/enums/enums.js';

const siteTargetTypeToReadable = {
  [SiteTargetType.KIDS]: 'Kids 8-14',
  [SiteTargetType.TEENAGER]: 'Teenager 14-18',
  [SiteTargetType.YOUNG_ADULT]: 'Young adult 18-35',
  [SiteTargetType.ADULT]: 'Adult 35-65',
  [SiteTargetType.ELDERLY]: 'Elderly 65-99',
} as const;

export { siteTargetTypeToReadable };
