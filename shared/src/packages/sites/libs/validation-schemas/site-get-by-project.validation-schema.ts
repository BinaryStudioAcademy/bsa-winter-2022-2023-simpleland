import joi from 'joi';

import { type SiteGetByProjectParametersDto } from '../types/types.js';
import { siteSearch } from './site-search.validation-schema.js';

const siteGetByProjectParameters = joi.object<
  SiteGetByProjectParametersDto,
  true
>({
  projectId: joi.number().required(),
  parameters: siteSearch,
});

export { siteGetByProjectParameters };
