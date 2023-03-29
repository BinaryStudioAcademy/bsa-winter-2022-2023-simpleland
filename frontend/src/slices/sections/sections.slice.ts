import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SectionGetAllItemResponseDto } from '~/packages/sections/sections.js';

import { getSiteSections } from './actions.js';

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
  },
});

export { actions, name, reducer };
