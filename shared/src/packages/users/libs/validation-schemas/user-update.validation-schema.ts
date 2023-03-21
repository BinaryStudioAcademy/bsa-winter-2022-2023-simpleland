import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/libs/enums/enums.js';
import { type UserUpdateRequestDto } from '~/packages/users/libs/types/types.js';

const userUpdate = joi.object<UserUpdateRequestDto, true>({
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
  accountName: joi.string().required(),
});

export { userUpdate };
