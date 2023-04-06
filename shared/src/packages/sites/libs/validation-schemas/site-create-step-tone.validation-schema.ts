import joi from 'joi';

import { SiteValidationMessage } from '~/packages/sites/libs/enums/enums.js';
import {
  type SiteCreateStepTone,
  SiteToneType,
} from '~/packages/sites/sites.js';

const siteCreateStepTone = joi.object<SiteCreateStepTone, true>({
  tone: joi
    .string()
    .valid(...Object.values(SiteToneType))
    .required()
    .messages({
      'string.empty': SiteValidationMessage.SITE_TONE_REQUIRE,
      'string.pattern.base': SiteValidationMessage.SITE_TONE_PATTERN,
    }),
});

export { siteCreateStepTone };
