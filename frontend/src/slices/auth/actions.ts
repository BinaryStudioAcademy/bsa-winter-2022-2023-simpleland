import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponse,
  type UserSignUpRequestDto,
  type UserUpdateRequestDto,
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

const updateUser = createAsyncThunk<
  UserAuthResponse,
  UserUpdateRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/update-user-details`,
  async (updateUserDetailsPayload, { extra }) => {
    const { userApi } = extra;

    return await userApi.updateUserDetails(updateUserDetailsPayload);
  },
);

export { signUp, updateUser };
