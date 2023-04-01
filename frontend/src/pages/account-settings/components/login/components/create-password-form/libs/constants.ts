import { type UserUpdatePasswordRequestDto } from '~/packages/users/users.js';

const DEFAULT_UPDATE_PASSWORD_PAYLOAD: UserUpdatePasswordRequestDto = {
  password: '',
  newPassword: '',
  repeatNewPassword: '',
};

const inputWrapper = 'input-wrapper';
const inputIcon = 'input-icon';

export { DEFAULT_UPDATE_PASSWORD_PAYLOAD, inputIcon, inputWrapper };
