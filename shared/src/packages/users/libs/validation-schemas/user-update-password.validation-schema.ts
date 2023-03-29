import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/libs/enums/enums.js';
import { type UserUpdatePasswordRequestDto } from '~/packages/users/libs/types/types.js';

const userUpdatePassword = joi.object<UserUpdatePasswordRequestDto, true>({
  password: joi
    .string()
    .pattern(UserValidationRule.PASSWORD_REGEX)
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    }),
  newPassword: joi
    .string()
    .pattern(UserValidationRule.PASSWORD_REGEX)
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    }),
});

export { userUpdatePassword };
