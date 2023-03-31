import joi from 'joi';

import { UserValidationRule } from '~/packages/users/libs/enums/enums.js';
import { type UserCredentials } from '~/packages/users/libs/types/types.js';
import { UserValidationMessage } from '~/packages/users/users.js';

const userCredentials = joi.object<UserCredentials, true>({
  login: joi
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
});

export { userCredentials };
