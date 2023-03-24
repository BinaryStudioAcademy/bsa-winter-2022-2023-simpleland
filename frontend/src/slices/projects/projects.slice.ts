import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type GetProjectsItemResponseDto } from '~/packages/projects/projects.js';

import { getProjects } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  projects: GetProjectsItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  projects: [],
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'projects',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProjects.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.projects = action.payload.items;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
