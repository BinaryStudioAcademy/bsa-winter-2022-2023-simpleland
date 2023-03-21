import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

import { getAuthUser } from './actions.js';

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
  name: 'authUser',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthUser.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAuthUser.fulfilled, (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAuthUser.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };