import { type UserAuthResponse } from './user-auth-response.type.js';

type UserSignInResponseDto = {
  token: string;
  user: UserAuthResponse;
};

export { type UserSignInResponseDto };
