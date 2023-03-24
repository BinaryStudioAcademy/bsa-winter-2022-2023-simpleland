import joi from 'joi';

import { type SiteCreateRequestDto } from '../types/types.js';

const siteCreate = joi.object<SiteCreateRequestDto, true>({
  name: joi.string().required(),
  publishedUrl: joi.string().allow(null),
});

export { siteCreate };
