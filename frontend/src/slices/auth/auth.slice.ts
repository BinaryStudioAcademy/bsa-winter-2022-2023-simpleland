import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { getCurrentUser, logout, signIn, signUp } from './actions.js';

type State = {
  currentUserDataStatus: ValueOf<typeof DataStatus>;
  user: UserAuthResponse | null;
};

const initialState: State = {
  currentUserDataStatus: DataStatus.IDLE,
  user: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.currentUserDataStatus = DataStatus.IDLE;
      state.user = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.currentUserDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(usersActions.updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(usersActions.updateUserLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(
      usersActions.updateUserAvatar.fulfilled,
      (state, action) => {
        state.user = action.payload;
        state.currentUserDataStatus = DataStatus.FULFILLED;
      },
    );
  },
});

export { actions, name, reducer };
