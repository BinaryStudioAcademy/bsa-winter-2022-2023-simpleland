import { type SitesFilterQueryDto } from './sites-search-request-dto.type.js';

type SiteGetByProjectParametersDto = {
  projectId: number;
  parameters: SitesFilterQueryDto;
};

export { type SiteGetByProjectParametersDto };
