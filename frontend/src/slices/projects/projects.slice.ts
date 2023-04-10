import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllItemResponseDto } from '~/packages/projects/projects.js';

import {
  getCurrentProject,
  getUserProjects,
  updateProject,
  uploadProjectImage,
} from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  projects: ProjectGetAllItemResponseDto[];
  projectsCount: number;
  currentProject: ProjectGetAllItemResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  projects: [],
  projectsCount: 0,
  currentProject: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'projects',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserProjects.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.projects = action.payload.items;
      state.projectsCount = action.payload.totalCount;
    });
    builder.addCase(getUserProjects.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(uploadProjectImage.fulfilled, (state, { payload }) => {
      state.projects = state.projects.map((project) =>
        project.id === payload.id ? payload : project,
      );
    });
    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.projects = state.projects.map((project) =>
        project.id === payload.id ? payload : project,
      );
    });
    builder.addCase(updateProject.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getCurrentProject.fulfilled, (state, { payload }) => {
      state.currentProject = payload;
    });
    builder.addCase(getCurrentProject.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getCurrentProject.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
