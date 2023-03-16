import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .regex(UserValidationRule.EMAIL_REGEX)
    .email({
      tlds: {
        allow: false,
      },
    })
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.EMAIL_IS_INVALID,
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: joi
    .string()
    .pattern(UserValidationRule.PASSWORD_REGEX)
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    }),
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
});

export { userSignUp };
