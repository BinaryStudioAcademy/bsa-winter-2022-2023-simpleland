import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import {
  type ProjectCreateRequestDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectUploadImageDto,
} from '~/packages/projects/projects.js';

import { name as sliceName } from './projects.slice.js';

const createProject = createAsyncThunk<
  ProjectGetAllItemResponseDto,
  ProjectCreateRequestDto & ProjectUploadImageDto,
  AsyncThunkConfig
>(`${sliceName}/create-project`, async (createProjectPayload, { extra }) => {
  const { projectsApi } = extra;

  const { name, formData } = createProjectPayload;

  const project = await projectsApi.createProject({
    name,
  });

  if (formData) {
    return await projectsApi.uploadProjectImage(project.id, formData);
  }

  return project;
});

const getUserProjects = createAsyncThunk<
  ProjectGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-projects`, async (_, { extra }) => {
  const { projectsApi } = extra;

  return await projectsApi.getProjects();
});

const uploadProjectImage = createAsyncThunk<
  ProjectGetAllItemResponseDto,
  {
    projectId: number;
    formData: FormData;
  },
  AsyncThunkConfig
>(`${sliceName}/upload-project-image`, async (payload, { extra }) => {
  const { projectsApi } = extra;

  const { projectId, formData } = payload;

  return await projectsApi.uploadProjectImage(projectId, formData);
});

export { createProject, getUserProjects, uploadProjectImage };
