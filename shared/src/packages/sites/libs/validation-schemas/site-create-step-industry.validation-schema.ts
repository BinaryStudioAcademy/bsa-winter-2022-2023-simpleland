import joi from 'joi';

import { SiteValidationMessage, SiteValidationRule } from '../enums/enums.js';
import { type SiteCreateStepIndustry } from '../types/types.js';

const siteCreateStepIndustry = joi.object<SiteCreateStepIndustry, true>({
  industry: joi
    .string()
    .required()
    .pattern(SiteValidationRule.SITE_INDUSTRY_REGEX)
    .messages({
      'string.empty': SiteValidationMessage.SITE_INDUSTRY_REQUIRE,
      'string.pattern.base': SiteValidationMessage.SITE_INDUSTRY_WRONG,
    }),
});

export { siteCreateStepIndustry };
