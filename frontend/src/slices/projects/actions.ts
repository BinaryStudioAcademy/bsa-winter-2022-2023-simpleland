import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ProjectGetAllResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';

import { name as sliceName } from './projects.slice.js';

const getUserProjects = createAsyncThunk<
  ProjectGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-user-projects`, (_, { extra }) => {
  const { projectsApi } = extra;

  return projectsApi.getUserProjects();
});

export { getUserProjects };
