import { type SitesFilterQueryDto } from './sites-filter-query-dto.type.js';

type SiteGetByProjectParametersDto = {
  projectId: number;
  queryParameters: SitesFilterQueryDto;
};

export { type SiteGetByProjectParametersDto };
