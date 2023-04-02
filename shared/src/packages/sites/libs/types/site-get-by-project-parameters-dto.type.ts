import { type SitesSearchRequestDto } from './sites-search-request-dto.type.js';

type SiteGetByProjectParametersDto = {
  projectId: number;
  parameters: SitesSearchRequestDto;
};

export { type SiteGetByProjectParametersDto };
