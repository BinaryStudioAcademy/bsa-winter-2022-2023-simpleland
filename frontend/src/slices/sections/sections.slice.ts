import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SectionGetAllItemResponseDto } from '~/packages/sections/sections.js';

import { getSiteSections, updateContent } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  sections: SectionGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  sections: [],
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'sections',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSiteSections.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getSiteSections.fulfilled, (state, action) => {
      state.sections = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getSiteSections.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(updateContent.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.sections = state.sections.map((section) =>
        section.id === action.payload.id
          ? { ...section, content: action.payload.content }
          : section,
      );
    });
  },
});

export { actions, name, reducer };
