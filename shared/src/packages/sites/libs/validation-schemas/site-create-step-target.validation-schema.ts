import joi from 'joi';

import { SiteTargetType, SiteValidationMessage } from '../enums/enums.js';
import { type SiteCreateStepTarget } from '../types/types.js';

const siteCreateStepTarget = joi.object<SiteCreateStepTarget, true>({
  targetAudience: joi
    .string()
    .valid(...Object.values(SiteTargetType))
    .required()
    .messages({
      'string.empty': SiteValidationMessage.SITE_TARGET_REQUIRE,
      'string.pattern.base': SiteValidationMessage.SITE_TARGET_WRONG,
    }),
});

export { siteCreateStepTarget };
