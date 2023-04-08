import { type SiteCreateRequestDto } from '~/packages/sites/sites.js';

type CurrentStepFormProperties = {
  onSubmit: (newSitePayload: Partial<SiteCreateRequestDto>) => void;
  siteInfo: SiteCreateRequestDto;
};

export { type CurrentStepFormProperties };
