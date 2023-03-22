import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import {
  type SiteGetAllResponseDto,
  type SiteGetByProjectRequestDtoType,
} from '~/packages/sites/sites.js';

import { name as sliceName } from './sites.slice.js';

const getSites = createAsyncThunk<
  SiteGetAllResponseDto,
  SiteGetByProjectRequestDtoType,
  AsyncThunkConfig
>(`${sliceName}/sites`, (payload, { extra }) => {
  const { sitesApi } = extra;

  return sitesApi.getProjectSites(payload.projectId);
});

export { getSites };
