import { createAsyncThunk } from '@reduxjs/toolkit';

import { storage, StorageKey } from '~/libs/packages/storage/storage.js';
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
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  const user = await authApi.signUp(registerPayload);
  void storage.set(StorageKey.TOKEN, user.token);
  return user;
});

export { signUp };
