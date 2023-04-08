import joi from 'joi';

import { ProjectCategory } from '~/packages/projects/projects.js';
import {
  type SiteCreateRequestDto,
  SiteTargetType,
  SiteToneType,
} from '~/packages/sites/sites.js';

const siteCreate = joi.object<SiteCreateRequestDto, true>({
  name: joi.string().required(),
  category: joi
    .string()
    .trim()
    .valid(...Object.values(ProjectCategory)),
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
