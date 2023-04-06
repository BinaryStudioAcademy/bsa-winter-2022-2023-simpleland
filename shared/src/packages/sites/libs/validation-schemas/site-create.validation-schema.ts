import joi from 'joi';

import {
  type SiteCreateRequestDto,
  SiteTargetType,
  SiteToneType,
} from '~/packages/sites/sites.js';

const siteCreate = joi.object<SiteCreateRequestDto, true>({
  name: joi.string().required(),
  industry: joi.string().required(),
  tone: joi
    .string()
    .valid(...Object.values(SiteToneType))
    .required(),
  targetAudience: joi
    .string()
    .valid(...Object.values(SiteTargetType))
    .required(),
});

export { siteCreate };
