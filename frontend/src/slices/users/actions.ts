import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type SubscribeRequestDto } from '~/packages/subscription/subscription.js';
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
  const { userApi, notification } = extra;

  const user = await userApi.updateUser(updateUserPayload);

  notification.success(
    'Your profile information has been successfully changed',
  );

  return user;
});

const updateUserLogin = createAsyncThunk<
  UserAuthResponse,
  UserUpdateLoginRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/update-user-login`,
  async (updateUserLoginPayload, { extra }) => {
    const { userApi, notification } = extra;

    const user = await userApi.updateUserLogin(updateUserLoginPayload);

    notification.success('Your email has been successfully changed');

    return user;
  },
);

const updateUserPassword = createAsyncThunk<
  UserAuthResponse,
  UserUpdatePasswordRequestDto,
  AsyncThunkConfig
>(
  `${sliceName}/update-password`,
  async (updateUserPasswordPayload, { extra }) => {
    const { userApi, notification } = extra;

    const user = await userApi.updateUserPassword(updateUserPasswordPayload);

    notification.success('Your password has been successfully changed');

    return user;
  },
);

const updateUserAvatar = createAsyncThunk<
  UserAuthResponse,
  FormData,
  AsyncThunkConfig
>(`${sliceName}/update-user-avatar`, async (payload, { extra }) => {
  const { userApi, notification } = extra;

  const user = await userApi.updateUserAvatar(payload);

  notification.success('Your avatar has been successfully changed');

  return user;
});

const subscribe = createAsyncThunk<
  UserAuthResponse,
  SubscribeRequestDto,
  AsyncThunkConfig
>(`${sliceName}/subscribe`, async (payload, { extra }) => {
  const { subscriptionApi, notification } = extra;

  const subscription = await subscriptionApi.subscribe(payload);

  notification.success('Your subscription has been successfully changed');

  return subscription;
});

export {
  subscribe,
  updateUser,
  updateUserAvatar,
  updateUserLogin,
  updateUserPassword,
};
