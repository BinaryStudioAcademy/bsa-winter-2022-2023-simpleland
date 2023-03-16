import { type UserAuthResponse } from './user-auth-response.type.js';

type UserSignUpResponseDto = {
  token: string;
  user: UserAuthResponse;
};

export { type UserSignUpResponseDto };
