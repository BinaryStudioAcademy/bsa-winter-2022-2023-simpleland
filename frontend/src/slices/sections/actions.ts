import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import { type SectionGetAllItemResponseDto } from '~/packages/sections/sections.js';

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

const updateContent = createAsyncThunk<
  SectionGetAllItemResponseDto,
  { id: number; content: unknown },
  AsyncThunkConfig
>(`${sliceName}/update-header`, async (payload, { extra }) => {
  const { sectionsApi } = extra;

  return await sectionsApi.updateContent(payload);
});

export { getSiteSections, updateContent };
