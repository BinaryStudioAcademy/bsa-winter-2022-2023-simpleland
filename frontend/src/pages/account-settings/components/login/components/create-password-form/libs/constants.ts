import { type UserUpdatePasswordRequestDto } from '~/packages/users/users.js';

const DEFAULT_UPDATE_PASSWORD_PAYLOAD: UserUpdatePasswordRequestDto = {
  password: '',
  newPassword: '',
  repeatNewPassword: '',
};

export { DEFAULT_UPDATE_PASSWORD_PAYLOAD };
