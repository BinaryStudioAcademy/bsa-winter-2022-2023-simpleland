import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions, name } = createSlice({
  initialState: {},
  name: 'app',
  reducers: {},
});

export { actions, name, reducer };
