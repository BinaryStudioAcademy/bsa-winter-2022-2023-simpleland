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
    .invalid(joi.ref('password'))
    .messages({
      'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'any.invalid': UserValidationMessage.NEW_PASSWORD_CANNOT_BE_SAME_AS_OLD,
    }),
  repeatNewPassword: joi
    .string()
    .pattern(UserValidationRule.PASSWORD_REGEX)
    .required()
    .valid(joi.ref('newPassword'))
    .messages({
      'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'any.only': UserValidationMessage.NEW_PASSWORD_IS_INVALID,
    }),
});

export { userUpdatePassword };
