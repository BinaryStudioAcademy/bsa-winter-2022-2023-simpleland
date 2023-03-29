import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponse,
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

const updatePassword = createAsyncThunk<
  UserAuthResponse,
  UserUpdatePasswordRequestDto,
  AsyncThunkConfig
>(`${sliceName}/update-password`, async (updatePasswordPayload, { extra }) => {
  const { userApi } = extra;

  return await userApi.updatePassword(updatePasswordPayload);
});

export { updatePassword, updateUser };
