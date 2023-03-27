import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import { type ProjectGetAllResponseDto } from '~/packages/projects/projects.js';

import { name as sliceName } from './projects.slice.js';

const getUserProjects = createAsyncThunk<
  ProjectGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-projects`, async (_, { extra }) => {
  const { projectsApi } = extra;

  return await projectsApi.getProjects();
});

export { getUserProjects };
