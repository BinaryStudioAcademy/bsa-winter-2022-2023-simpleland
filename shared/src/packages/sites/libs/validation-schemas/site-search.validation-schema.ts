import joi from 'joi';

import { type SitesFilterQueryDto } from '../types/types.js';

const siteSearch = joi.object<SitesFilterQueryDto, true>({
  pattern: joi.string().allow(null, ''),
});

export { siteSearch };
