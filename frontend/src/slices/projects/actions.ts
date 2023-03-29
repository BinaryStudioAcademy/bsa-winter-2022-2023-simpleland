import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import {
  type ProjectCreateRequestDto,
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
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-projects`, async (_, { extra }) => {
  const { projectsApi } = extra;

  return await projectsApi.getProjects();
});

export { createProject, getUserProjects };
