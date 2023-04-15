const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  EMAIL_IS_INVALID: 'Incorrect email format',
  PASSWORD_IS_INVALID: 'Incorrect password',
  PASSWORD_REQUIRE: 'Password is required',
  NEW_PASSWORD_IS_INVALID:
    'The value of the repeat new password must match the new password',
  NEW_PASSWORD_CANNOT_BE_SAME_AS_OLD:
    'New password cannot be the same as the previous one',
  FIRST_NAME_REQUIRE: 'First name is required',
  FIRST_NAME_IS_INVALID: 'Incorrect first name',
  LAST_NAME_REQUIRE: 'Last name is required',
  LAST_NAME_IS_INVALID: 'Incorrect last name',
  ACCOUNT_NAME_IS_INVALID: 'Incorrect account name',
} as const;

export { UserValidationMessage };
