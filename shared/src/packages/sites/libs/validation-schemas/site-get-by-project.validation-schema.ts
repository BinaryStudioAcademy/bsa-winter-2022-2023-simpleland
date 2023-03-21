import joi from 'joi';

import { type SiteGetByProjectRequestDtoType } from '../types/types.js';

const siteGetByProject = joi.object<SiteGetByProjectRequestDtoType, true>({
  projectId: joi.number().required(),
});

export { siteGetByProject };
