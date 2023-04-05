import { type ValueOf } from '~/libs/types/types.js';
import { type SiteToneType } from '~/packages/sites/libs/enums/enums.js';

type SiteCreateRequestDto = {
  name: string;
  industry: string;
  tone: ValueOf<typeof SiteToneType>;
};

export { type SiteCreateRequestDto };
