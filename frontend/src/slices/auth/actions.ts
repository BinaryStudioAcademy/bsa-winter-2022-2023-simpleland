import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserAuthResponse } from 'shared/build/index.js';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
   type UserSignInRequestDto,
   type UserSignUpRequestDto, 
  } from '~/packages/users/users.js';

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

export { signIn,signUp };
