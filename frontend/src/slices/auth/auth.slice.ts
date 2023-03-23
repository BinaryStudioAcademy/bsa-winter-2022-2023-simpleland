import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { getCurrentUser, signUp } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  user: UserAuthResponse | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(usersActions.updateUser.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(usersActions.updateUser.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = action.payload;
    });
    builder.addCase(usersActions.updateUser.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
