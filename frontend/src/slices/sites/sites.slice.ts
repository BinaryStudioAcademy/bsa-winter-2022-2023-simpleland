import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SiteGetAllItemResponseDto } from '~/packages/sites/sites.js';

import { getSitesByProjectId } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  sites: SiteGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  sites: [],
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'sites',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSitesByProjectId.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getSitesByProjectId.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.sites = action.payload.items;
    });
    builder.addCase(getSitesByProjectId.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
