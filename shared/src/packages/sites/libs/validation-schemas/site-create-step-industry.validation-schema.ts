import joi from 'joi';

import { SiteValidationMessage, SiteValidationRule } from '../enums/enums.js';
import { type SiteCreateIndustryName } from '../types/types.js';

const siteCreateStepIndustry = joi
  .object<SiteCreateIndustryName, true>()
  .keys({
    selectIndustry: joi.string().empty('').messages({
      'string.empty': SiteValidationMessage.SITE_INDUSTRY_REQUIRE,
    }),
    enterIndustry: joi
      .string()
      .empty('')
      .pattern(SiteValidationRule.SITE_INDUSTRY_REGEX)
      .messages({
        'string.empty': SiteValidationMessage.SITE_INDUSTRY_REQUIRE,
        'string.pattern.base': SiteValidationMessage.SITE_INDUSTRY_WRONG,
      }),
  })
  .xor('selectIndustry', 'enterIndustry');

export { siteCreateStepIndustry };
