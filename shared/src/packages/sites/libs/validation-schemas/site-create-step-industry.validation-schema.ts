import joi, { allow } from 'joi';

import { SiteValidationMessage, SiteValidationRule } from '../enums/enums.js';
import { type SiteCreateIndustryName } from '../types/types.js';

const siteCreateStepIndustry = joi
  .object<SiteCreateIndustryName, true>()
  .keys({
    selectIndustry: joi.string().allow('').messages({
      'string.empty': SiteValidationMessage.SITE_INDUSTRY_REQUIRE,
    }),
    enterIndustry: joi
      .string()
      .pattern(SiteValidationRule.SITE_INDUSTRY_REGEX)
      .messages({
        'string.empty': SiteValidationMessage.SITE_INDUSTRY_REQUIRE,
        'string.pattern.base': SiteValidationMessage.SITE_INDUSTRY_WRONG,
      }),
  })
  .or('selectIndustry', 'enterIndustry');

export { siteCreateStepIndustry };
