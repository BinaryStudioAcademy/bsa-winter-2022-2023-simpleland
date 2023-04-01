import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type AsyncThunkConfig, type ValueOf } from '~/libs/types/types.js';
import {
  type SiteCreateRequestDto,
  type SiteGetAllResponseDto,
  type SiteGetByProjectParametersDto,
} from '~/packages/sites/sites.js';
import { actions as appActions } from '~/slices/app/app.js';

import { name as sliceName } from './sites.slice.js';

const createSite = createAsyncThunk<
  unknown,
  SiteCreateRequestDto & {
    projectId: number;
  },
  AsyncThunkConfig
>(`${sliceName}/create-site`, async (payload, { extra, dispatch }) => {
  const { sitesApi } = extra;
  const { projectId, ...createSitePayload } = payload;

  const site = await sitesApi.createSite(projectId, createSitePayload);

  dispatch(
    appActions.navigate(
      configureString<ValueOf<typeof AppRoute>>(AppRoute.SITES_$SITE_ID, {
        siteId: site.id,
      }),
    ),
  );
});

const getSitesByProject = createAsyncThunk<
  SiteGetAllResponseDto,
  SiteGetByProjectParametersDto,
  AsyncThunkConfig
>(`${sliceName}/sites`, async (payload, { extra }) => {
  const { sitesApi } = extra;

  return await sitesApi.getByProjectId(payload.projectId);
});

export { createSite, getSitesByProject };
