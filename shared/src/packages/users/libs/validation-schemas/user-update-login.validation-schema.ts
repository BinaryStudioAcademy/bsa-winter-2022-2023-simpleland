import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/libs/enums/enums.js';
import { type UserUpdateLoginRequestDto } from '~/packages/users/libs/types/types.js';

const userUpdateLogin = joi.object<UserUpdateLoginRequestDto, true>({
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
});

export { userUpdateLogin };
