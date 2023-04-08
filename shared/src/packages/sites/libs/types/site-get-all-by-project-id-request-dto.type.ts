import { type SitesFilterQueryDto } from './sites-filter-query-dto.type.js';
import { type SitesGetByProjectIdParametersDto } from './sites-get-all-by-broject-id-parameters-dto.type.js';

type SitesGetByProjectIdRequestDto = {
  parameters: SitesGetByProjectIdParametersDto;
  queryParameters: SitesFilterQueryDto;
};

export { type SitesGetByProjectIdRequestDto };
