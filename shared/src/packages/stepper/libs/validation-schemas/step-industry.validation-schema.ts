import joi from 'joi';

import {
  StepIndustryValidationRule,
  StepperValidationMessage,
} from '../enums/enums.js';
import { type StepIndustryDto } from '../types/types.js';

const stepIndustry = joi
  .object<StepIndustryDto, true>({
    industrySelect: joi
      .object({
        value: joi.string().required(),
        label: joi.string().required(),
      })
      .required()
      .messages({
        'object.empty': StepperValidationMessage.FIELD_REQUIRE,
      }),
    industryInput: joi
      .string()
      .pattern(StepIndustryValidationRule.INPUT_REGEX)
      .allow('')
      .messages({
        'string.empty': StepperValidationMessage.FIELD_REQUIRE,
        'string.pattern.base': StepperValidationMessage.INDUSTRY_IS_INVALID,
      }),
  })
  .or('industrySelect', 'industryInput')
  .and('industrySelect', 'industryInput');

export { stepIndustry };
