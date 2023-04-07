import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import {
  type ProjectFilterQueryDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectRequestDto,
  type ProjectUploadImageDto,
} from '~/packages/projects/projects.js';

import { name as sliceName } from './projects.slice.js';

const createProject = createAsyncThunk<
  ProjectGetAllItemResponseDto,
  ProjectRequestDto & ProjectUploadImageDto,
  AsyncThunkConfig
>(`${sliceName}/create-project`, async (createProjectPayload, { extra }) => {
  const { projectsApi } = extra;

  const { name, formData, category } = createProjectPayload;

  const project = await projectsApi.createProject({
    name,
    category,
  });

  if (formData) {
    return await projectsApi.uploadProjectImage(project.id, formData);
  }

  return project;
});

const getUserProjects = createAsyncThunk<
  ProjectGetAllResponseDto,
  ProjectFilterQueryDto,
  AsyncThunkConfig
>(`${sliceName}/get-projects`, async (parameters, { extra }) => {
  const { projectsApi } = extra;

  return await projectsApi.getProjects(parameters);
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

const updateProject = createAsyncThunk<
  ProjectGetAllItemResponseDto,
  {
    projectId: number;
    payload: ProjectRequestDto & ProjectUploadImageDto;
  },
  AsyncThunkConfig
>(`${sliceName}/update-project`, async (updateProjectPayload, { extra }) => {
  const { projectsApi } = extra;

  const { projectId, payload } = updateProjectPayload;

  const { formData, ...updatedData } = payload;

  const project = await projectsApi.updateProject(projectId, updatedData);

  if (formData) {
    return await projectsApi.uploadProjectImage(projectId, formData);
  }

  return project;
});

export { createProject, getUserProjects, updateProject, uploadProjectImage };
