import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllItemResponseDto } from '~/packages/projects/projects.js';

import {
  createProject,
  getUserProjects,
  uploadProjectImage,
} from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  projects: ProjectGetAllItemResponseDto[];
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
    builder.addCase(createProject.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.projects = [...state.projects, action.payload];
    });
    builder.addCase(createProject.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getUserProjects.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getUserProjects.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.projects = action.payload.items;
    });
    builder.addCase(getUserProjects.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(uploadProjectImage.fulfilled, (state, { payload }) => {
      state.projects = state.projects.map((project) =>
        project.id === payload.id ? payload : project,
      );
    });
  },
});

export { actions, name, reducer };
