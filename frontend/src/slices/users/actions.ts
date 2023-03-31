import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponse,
  type UserUpdateLoginRequestDto,
  type UserUpdatePasswordRequestDto,
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

const updateUserPassword = createAsyncThunk<
  UserAuthResponse,
  UserUpdatePasswordRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/update-password`,
  async (updateUserPasswordPayload, { extra }) => {
    const { userApi } = extra;

    return await userApi.updateUserPassword(updateUserPasswordPayload);
  },
);

export { updateUser, updateUserLogin, updateUserPassword };
