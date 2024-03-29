import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { UserApi } from './users-api.js';

const userApi = new UserApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { userApi };
export {
  type UserAuthResponse,
  type UserGetAllItemResponseDto,
  type UserGetAllResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
  type UserUpdateLoginRequestDto,
  type UserUpdatePasswordRequestDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';
export {
  userSignInValidationSchema,
  userSignUpValidationSchema,
  userUpdateLoginValidationSchema,
  userUpdatePasswordValidationSchema,
  userUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
