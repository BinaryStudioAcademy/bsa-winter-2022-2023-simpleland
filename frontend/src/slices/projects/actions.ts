import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import {
  type ProjectGetAllResponseDto,
  type ProjectSearchParameters,
} from '~/packages/projects/projects.js';

import { name as sliceName } from './projects.slice.js';

const getUserProjects = createAsyncThunk<
  ProjectGetAllResponseDto,
  ProjectSearchParameters | undefined,
  AsyncThunkConfig
>(`${sliceName}/get-projects`, async (parameters, { extra }) => {
  const { projectsApi } = extra;

  return await projectsApi.getProjects(parameters);
});

export { getUserProjects };
