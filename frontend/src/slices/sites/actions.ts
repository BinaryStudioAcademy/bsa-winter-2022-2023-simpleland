import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import {
  type SiteGetAllResponseDto,
  type SiteGetByProjectParametersDto,
} from '~/packages/sites/sites.js';

import { name as sliceName } from './sites.slice.js';

const getSitesByProject = createAsyncThunk<
  SiteGetAllResponseDto,
  SiteGetByProjectParametersDto,
  AsyncThunkConfig
>(`${sliceName}/sites`, async (payload, { extra }) => {
  const { sitesApi } = extra;

  return await sitesApi.getByProjectId(payload.projectId);
});

export { getSitesByProject };
