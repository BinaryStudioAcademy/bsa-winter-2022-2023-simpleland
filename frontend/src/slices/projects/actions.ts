import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import {
  type ProjectCreateRequestDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
} from '~/packages/projects/projects.js';

import { name as sliceName } from './projects.slice.js';

const createProject = createAsyncThunk<
  ProjectGetAllItemResponseDto,
  ProjectCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-project`, async (createProjectPayload, { extra }) => {
  const { projectsApi } = extra;

  return await projectsApi.createProject(createProjectPayload);
});

const getUserProjects = createAsyncThunk<
  ProjectGetAllResponseDto,
  ProjectFilterQueryDto,
  AsyncThunkConfig
>(`${sliceName}/get-projects`, async (parameters, { extra }) => {
  const { projectsApi } = extra;

  return await projectsApi.getProjects(parameters);
});

export { createProject, getUserProjects };
