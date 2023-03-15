import { createAsyncThunk } from '@reduxjs/toolkit';

// import { NotificationType } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
  const { authApi } = extra;
  // const { notification } = extra;

  // ERROR HANDLING EXAMPLE
  // try {
  //   throw new Error('test');
  // } catch (error) {
  //   notification.show((error as Error).message, NotificationType.ERROR)
  // }

  return authApi.signUp(registerPayload);
});

export { signUp };
