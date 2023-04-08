import joi from 'joi';

import { type SitesGetByProjectIdParametersDto } from '../types/types.js';

const sitesGetByProjectIdParameters = joi.object<
  SitesGetByProjectIdParametersDto,
  true
>({
  projectId: joi.number().required(),
});

export { sitesGetByProjectIdParameters };
