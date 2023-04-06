import { type ValueOf } from '~/libs/types/types.js';
import { type SiteToneType } from '~/packages/sites/sites.js';

type SiteCreateRequestDto = {
  name: string;
  industry: string;
  tone: ValueOf<typeof SiteToneType>;
  targetAudience: string[];
};

export { type SiteCreateRequestDto };
