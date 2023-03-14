import joi from 'joi';

import { UserValidationMessage, UserValidationRules } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .regex(UserValidationRules.EMAIL_REGEX)
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
    .pattern(UserValidationRules.PASSWORD_REGEX)
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    }),
  firstName: joi
    .string()
    .pattern(UserValidationRules.FIRST_NAME_REGEX)
    .messages({
      'string.pattern.base': UserValidationMessage.FIRST_NAME_IS_INVALID,
      'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
    }),
  lastName: joi.string().pattern(UserValidationRules.LAST_NAME_REGEX).messages({
    'string.pattern.base': UserValidationMessage.LAST_NAME_IS_INVALID,
    'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
  }),
});

export { userSignUp };
