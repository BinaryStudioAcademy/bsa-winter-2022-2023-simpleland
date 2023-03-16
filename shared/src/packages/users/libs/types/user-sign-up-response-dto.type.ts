import { type UserRegisterResponse } from './user-register-response.type.js';

type UserSignUpResponseDto = {
  token: string;
  user: UserRegisterResponse;
};

export { type UserSignUpResponseDto };
