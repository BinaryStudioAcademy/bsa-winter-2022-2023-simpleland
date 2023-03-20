import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ValueOf } from 'shared/build/index.js';

import { type NotificationType } from '~/libs/packages/notification/notification.js';

import { name as sliceName } from './app.slice.js';

const notify = createAsyncThunk(
  `${sliceName}/notify`,
  ({
    message,
    type,
  }: {
    message: string;
    type: ValueOf<typeof NotificationType>;
  }) => {
    return {
      payload: {
        message,
        type,
      },
    };
  },
);

export { notify };
