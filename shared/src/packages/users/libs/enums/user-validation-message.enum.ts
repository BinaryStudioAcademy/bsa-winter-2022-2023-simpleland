const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  EMAIL_IS_INVALID: 'Invalid email format',
  PASSWORD_IS_INVALID:
    'Password must contain 8-30 characters and can contain only letters, number and special characters',
  PASSWORD_REQUIRE: 'Password is required',
  FIRST_NAME_REQUIRE: 'First name is required',
  FIRST_NAME_IS_INVALID: 'Invalid first name',
  LAST_NAME_REQUIRE: 'Last name is required',
  LAST_NAME_IS_INVALID: 'Invalid last name',
  ACCOUNT_NAME_REQUIRE: 'Account name is required',
} as const;

export { UserValidationMessage };
