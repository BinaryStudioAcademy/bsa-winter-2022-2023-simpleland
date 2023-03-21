import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserUpdateDetailsRequestDto } from '../types/types.js';

const userUpdateDetails = joi.object<UserUpdateDetailsRequestDto, true>({
  firstName: joi
    .string()
    .pattern(UserValidationRule.FIRST_NAME_REGEX)
    .messages({
      'string.pattern.base': UserValidationMessage.FIRST_NAME_IS_INVALID,
      'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
    }),
  lastName: joi.string().pattern(UserValidationRule.LAST_NAME_REGEX).messages({
    'string.pattern.base': UserValidationMessage.LAST_NAME_IS_INVALID,
    'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
  }),
  accountName: joi.string(),
});

export { userUpdateDetails };
