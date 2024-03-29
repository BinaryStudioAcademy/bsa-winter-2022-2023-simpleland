import { type ValueOf } from '~/libs/types/types.js';
import {
  type SiteTargetType,
  type SiteToneType,
} from '~/packages/sites/sites.js';

type SiteCreateRequestDto = {
  name: string;
  industry: string;
  tone: ValueOf<typeof SiteToneType>;
  targetAudience: ValueOf<typeof SiteTargetType>;
};

export { type SiteCreateRequestDto };
