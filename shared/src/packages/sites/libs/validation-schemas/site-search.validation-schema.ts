import joi from 'joi';

import { type SitesSearchRequestDto } from '../types/types.js';

const siteSearch = joi.object<SitesSearchRequestDto, true>({
  pattern: joi.string().allow(null, ''),
});

export { siteSearch };
