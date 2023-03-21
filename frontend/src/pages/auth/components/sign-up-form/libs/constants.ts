import { type UserSignUpRequestDto } from '~/packages/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  accountName: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
