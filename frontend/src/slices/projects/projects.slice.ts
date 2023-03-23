import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllResponseDto } from '~/packages/projects/projects.js';

import { getProjects } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  projects: ProjectGetAllResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  projects: { items: [] },
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
      state.projects = action.payload;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
