import { createSlice } from '@reduxjs/toolkit';
import { type UserSignUpResponseDto } from 'shared/build/index.js';

import { DataStatus } from '~/libs/enums/enums.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';
import { type ValueOf } from '~/libs/types/types.js';

import { signUp } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  user: UserSignUpResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: { token: '', user: { id: 1, email: '' } },
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      void storage.set(StorageKey.TOKEN, action.payload.token);
      state.user = action.payload;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
