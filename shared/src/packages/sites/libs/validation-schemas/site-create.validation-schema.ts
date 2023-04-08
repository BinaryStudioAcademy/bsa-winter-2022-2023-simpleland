import joi from 'joi';

import {
  type SiteCreateRequestDto,
  SiteCategoryType,
  SiteTargetType,
  SiteToneType,
} from '~/packages/sites/sites.js';

const siteCreate = joi.object<SiteCreateRequestDto, true>({
  name: joi.string().required(),
  category: joi
    .string()
    .trim()
    .valid(...Object.values(SiteCategoryType)),
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
