import { createSlice, isAnyOf } from '@reduxjs/toolkit';

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
    builder.addCase(logout.fulfilled, (state) => {
      state.currentUserDataStatus = DataStatus.IDLE;
      state.user = null;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.currentUserDataStatus = DataStatus.PENDING;
    });
    builder.addMatcher(
      isAnyOf(
        signIn.fulfilled,
        signUp.fulfilled,
        getCurrentUser.fulfilled,
        usersActions.updateUser.fulfilled,
        usersActions.updateUserAvatar.fulfilled,
      ),
      (state, action) => {
        state.currentUserDataStatus = DataStatus.FULFILLED;
        state.user = action.payload;
      },
    );
    builder.addMatcher(
      isAnyOf(
        signIn.rejected,
        signUp.rejected,
        getCurrentUser.rejected,
        usersActions.updateUser.rejected,
        usersActions.updateUserAvatar.rejected,
      ),
      (state) => {
        state.currentUserDataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
