import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/libs/enums/enums.js';
import { type UserUpdateCredentialsRequestDto } from '~/packages/users/libs/types/types.js';

const userUpdateCredentials = joi.object<UserUpdateCredentialsRequestDto, true>(
  {
    email: joi
      .string()
      .regex(UserValidationRule.EMAIL_REGEX)
      .email({
        tlds: {
          allow: false,
        },
      })
      .messages({
        'string.pattern.base': UserValidationMessage.EMAIL_IS_INVALID,
        'string.email': UserValidationMessage.EMAIL_WRONG,
        'string.empty': UserValidationMessage.EMAIL_REQUIRE,
      }),
  },
);

export { userUpdateCredentials };
