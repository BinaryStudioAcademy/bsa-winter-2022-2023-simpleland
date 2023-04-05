import { SiteToneType } from '~/packages/sites/libs/enums/enums.js';

const SiteToneTypeToReadable = {
  [SiteToneType.OFFICIAL]: 'Official',
  [SiteToneType.NOT_OFFICIAL]: 'Not official',
} as const;

export { SiteToneTypeToReadable };
