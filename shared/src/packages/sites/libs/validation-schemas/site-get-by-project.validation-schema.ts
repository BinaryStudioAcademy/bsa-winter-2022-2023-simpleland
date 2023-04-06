import joi from 'joi';

import { type SiteGetByProjectParametersDto } from '../types/types.js';
import { siteFilter } from './site-filter.validation-schema.js';

const siteGetByProjectParameters = joi.object<
  SiteGetByProjectParametersDto,
  true
>({
  projectId: joi.number().required(),
  queryParameters: siteFilter,
});

export { siteGetByProjectParameters };
