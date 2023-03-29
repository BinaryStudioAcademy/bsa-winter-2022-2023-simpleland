import { createAsyncThunk } from '@reduxjs/toolkit';
import { type SectionGetAllItemResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';

import { name as sliceName } from './sections.slice.js';

const getSiteSections = createAsyncThunk<
  SectionGetAllItemResponseDto[],
  { siteId: number },
  AsyncThunkConfig
>(`${sliceName}/get-sections-by-site-id`, async ({ siteId }, { extra }) => {
  const { sectionsApi } = extra;

  const { items } = await sectionsApi.getSectionsBySiteId(siteId);

  return items;
});

export { getSiteSections };
