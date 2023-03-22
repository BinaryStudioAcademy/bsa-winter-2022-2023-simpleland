import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserAuthResponse } from 'shared/build/index.js';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type UserSignUpRequestDto } from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserAuthResponse,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(signUpPayload);

  void storage.set(StorageKey.TOKEN, token);

  return user;
});

const getCurrentUser = createAsyncThunk<
  UserAuthResponse,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/current`, async (_, { extra }) => {
  const { authApi } = extra;

  return await authApi.getCurrent();
});

export { getCurrentUser, signUp };
