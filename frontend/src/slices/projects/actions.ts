import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '~/libs/enums/app-route.enum';
import { configureString } from '~/libs/helpers/helpers.js';
import { type AsyncThunkConfig, type ValueOf } from '~/libs/types/types.js';
import {
  type ProjectCreateRequestDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllResponseDto,
  type ProjectUploadImageDto,
} from '~/packages/projects/projects.js';
import { actions as appActions } from '~/slices/app/app.js';

import { name as sliceName } from './projects.slice.js';

const createProject = createAsyncThunk<
  unknown,
  ProjectCreateRequestDto & ProjectUploadImageDto,
  AsyncThunkConfig
>(
  `${sliceName}/create-project`,
  async (createProjectPayload, { extra, dispatch }) => {
    const { projectsApi } = extra;

    const { name, formData, category } = createProjectPayload;

    const project = await projectsApi.createProject({
      name,
      category,
    });

    if (formData) {
      await projectsApi.uploadProjectImage(project.id, formData);
    }

    dispatch(
      appActions.navigate(
        configureString<ValueOf<typeof AppRoute>>(
          AppRoute.PROJECTS_$PROJECT_ID_SITES,
          {
            projectId: project.id,
          },
        ),
      ),
    );
  },
);

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

export { createProject, getUserProjects, uploadProjectImage };
