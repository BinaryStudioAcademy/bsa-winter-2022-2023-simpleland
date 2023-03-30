import joi from 'joi';

import {
  StepIndustryValidationRule,
  StepsValidationMessage,
} from '../enums/enums.js';
import { type StepIndustryDto } from '../types/types.js';

const stepIndustry = joi
  .object<StepIndustryDto>()
  .keys({
    selectIndusrtyName: joi.string().optional().messages({
      'string.empty': StepsValidationMessage.FIELD_REQUIRE,
    }),
    enterIndustryName: joi
      .string()
      .pattern(StepIndustryValidationRule.INPUT_REGEX)
      .optional()
      .messages({
        'string.empty': StepsValidationMessage.FIELD_REQUIRE,
        'string.pattern.base': StepsValidationMessage.INDUSTRY_IS_INVALID,
      }),
  })
  .or('industrySelect', 'industryInput');

export { stepIndustry };
