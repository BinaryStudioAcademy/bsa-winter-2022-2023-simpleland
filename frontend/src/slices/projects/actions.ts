import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import { type GetProjectsResponseDto } from '~/packages/projects/projects.js';

import { name as sliceName } from './projects.slice.js';

const getProjects = createAsyncThunk<
  GetProjectsResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-projects`, (_, { extra }) => {
  const { projectsApi } = extra;

  return projectsApi.getProjects();
});

export { getProjects };
