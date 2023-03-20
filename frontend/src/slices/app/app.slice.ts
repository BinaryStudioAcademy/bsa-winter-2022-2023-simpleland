import { createSlice } from '@reduxjs/toolkit';

import { notification } from '~/libs/packages/notification/notification.js';

import { notify } from './actions.js';

const { reducer, actions, name } = createSlice({
  initialState: {},
  name: 'app',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(notify.fulfilled, () => {
      notification;
    });
  },
});

export { actions, name, reducer };
