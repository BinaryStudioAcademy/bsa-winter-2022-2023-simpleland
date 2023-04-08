import { type ValueOf } from '~/libs/types/types.js';
import {
  type SiteTargetType,
  type SiteToneType,
} from '~/packages/sites/sites.js';

type SiteCreateDto = {
  name: string;
  industry: string;
  tone: ValueOf<typeof SiteToneType>;
  targetAudience: ValueOf<typeof SiteTargetType>;
};

export { type SiteCreateDto };
