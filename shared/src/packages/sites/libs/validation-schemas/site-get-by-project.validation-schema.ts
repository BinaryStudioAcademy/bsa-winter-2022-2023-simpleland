import joi from 'joi';

import { type SiteGetByProjectParametersDto } from '../types/types.js';

const siteGetByProjectParameters = joi.object<
  SiteGetByProjectParametersDto,
  true
>({
  projectId: joi.number().required(),
});

export { siteGetByProjectParameters };
