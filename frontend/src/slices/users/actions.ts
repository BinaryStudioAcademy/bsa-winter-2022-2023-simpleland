import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponse,
  type UserUpdateLoginRequestDto,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './users.slice.js';

const updateUser = createAsyncThunk<
  UserAuthResponse,
  UserUpdateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/update-user`, async (updateUserPayload, { extra }) => {
  const { userApi } = extra;

  return await userApi.updateUser(updateUserPayload);
});

const updateUserLogin = createAsyncThunk<
  UserAuthResponse,
  UserUpdateLoginRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/update-user-login`,
  async (updateUserLoginPayload, { extra }) => {
    const { userApi } = extra;

    return await userApi.updateUserLogin(updateUserLoginPayload);
  },
);

export { updateUser, updateUserLogin };
