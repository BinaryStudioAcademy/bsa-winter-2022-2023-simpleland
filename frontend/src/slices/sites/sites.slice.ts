import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SiteGetAllItemResponseDto } from '~/packages/sites/sites.js';

import { createSite, getCurrentSite, getSitesByProjectId } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  dataSiteStatus: ValueOf<typeof DataStatus>;
  sites: SiteGetAllItemResponseDto[];
  currentSite: SiteGetAllItemResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  dataSiteStatus: DataStatus.IDLE,
  sites: [],
  currentSite: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'sites',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createSite.pending, (state) => {
      state.dataSiteStatus = DataStatus.PENDING;
    });
    builder.addCase(createSite.fulfilled, (state) => {
      state.dataSiteStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createSite.rejected, (state) => {
      state.dataSiteStatus = DataStatus.REJECTED;
    });
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
    builder.addCase(getCurrentSite.fulfilled, (state, { payload }) => {
      state.currentSite = payload;
    });
  },
});

export { actions, name, reducer };
