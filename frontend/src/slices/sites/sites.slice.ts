import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SiteGetAllResponseDto } from '~/packages/sites/sites.js';

import { getSites } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  sites: SiteGetAllResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  sites: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'sites',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSites.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getSites.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.sites = action.payload;
    });
    builder.addCase(getSites.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
