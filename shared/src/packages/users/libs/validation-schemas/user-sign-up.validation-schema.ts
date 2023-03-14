import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const EMAIL_REGEX =
  /^(\w)([\w+.-]{0,34}\w)?@[\dA-Za-z][\dA-Za-z-]{0,61}[\dA-Za-z]\.[A-Za-z]{2,}$/;
const PASSWORD_REGEX = /^[\d!"#$%&()-_`a-z{|}~]{8,30}$/;
const FIRST_NAME_REGEX = /^['A-Za-z-]+$/;
const LAST_NAME_REGEX = /^['A-Za-z-]+$/;

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .regex(EMAIL_REGEX)
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
  password: joi.string().pattern(PASSWORD_REGEX).required().messages({
    'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
    'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
  }),
  firstName: joi.string().pattern(FIRST_NAME_REGEX).messages({
    'string.pattern.base': UserValidationMessage.FIRST_NAME_IS_INVALID,
    'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
  }),
  lastName: joi.string().pattern(LAST_NAME_REGEX).messages({
    'string.pattern.base': UserValidationMessage.LAST_NAME_IS_INVALID,
    'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
  }),
});

export { userSignUp };
