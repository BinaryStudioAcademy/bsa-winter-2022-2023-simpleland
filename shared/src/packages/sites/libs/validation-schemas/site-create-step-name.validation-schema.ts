import joi from 'joi';

import { SiteValidationMessage, SiteValidationRule } from '../enums/enums.js';
import { type SiteCreateStepName } from '../types/types.js';

const siteCreateStepName = joi.object<SiteCreateStepName, true>({
  name: joi
    .string()
    .required()
    .pattern(SiteValidationRule.SITE_NAME_REGEX)
    .messages({
      'string.name': SiteValidationMessage.SITE_NAME_WRONG,
      'string.empty': SiteValidationMessage.SITE_NAME_REQUIRE,
      'string.pattern.base': SiteValidationMessage.SITE_NAME_PATTERN,
    }),
});

export { siteCreateStepName };
