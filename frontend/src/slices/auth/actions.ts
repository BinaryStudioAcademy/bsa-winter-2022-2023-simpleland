import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponse,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signIn = createAsyncThunk<
  UserAuthResponse,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(signInPayload);

  void storage.set(StorageKey.TOKEN, token);

  return user;
});

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

const logout = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
  `${sliceName}/logout`,
  async (_, { extra }) => {
    const { storage } = extra;

    await storage.drop(StorageKey.TOKEN);
  },
);

const getCurrentUser = createAsyncThunk<
  UserAuthResponse | null,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/current`, async (_, { extra }) => {
  const { authApi, storage } = extra;

  const token = await storage.get(StorageKey.TOKEN);
  const hasToken = Boolean(token);

  if (hasToken) {
    return await authApi.getCurrent();
  }

  return null;
});

export { getCurrentUser, signIn, signUp };
