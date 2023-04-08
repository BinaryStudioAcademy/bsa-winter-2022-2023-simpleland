import { type SiteCreateDto } from '~/packages/sites/sites.js';

type CurrentStepFormProperties = {
  onSubmit: (newSitePayload: Partial<SiteCreateDto>) => void;
  siteInfo: SiteCreateDto;
};

export { type CurrentStepFormProperties };
