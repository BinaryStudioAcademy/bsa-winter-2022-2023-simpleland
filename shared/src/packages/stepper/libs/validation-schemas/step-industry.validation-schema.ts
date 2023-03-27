import joi from 'joi';

import {
  StepIndustryValidationRule,
  StepperValidationMessage,
} from '../enums/enums.js';
import { type StepIndustryDto } from '../types/types.js';

const stepIndustry = joi.object<StepIndustryDto, true>({
  industrySelect: joi
    .object({ value: joi.string(), label: joi.string() })
    .messages({
      'string.empty': StepperValidationMessage.FIELD_REQUIRE,
    })
    // eslint-disable-next-line unicorn/no-thenable
    .when('industryInput', { not: joi.exist(), then: joi.required() }),
  industryInput: joi
    .string()
    .pattern(StepIndustryValidationRule.INPUT_REGEX)
    .messages({
      'string.empty': StepperValidationMessage.FIELD_REQUIRE,
      'string.pattern.base': StepperValidationMessage.INDUSTRY_IS_INVALID,
    }),
  // .when('industrySelect', { not: joi.exist(), then: joi.required() }),
});

export { stepIndustry };
