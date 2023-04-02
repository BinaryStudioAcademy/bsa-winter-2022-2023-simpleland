import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AppRoute } from '~/libs/enums/enums.js';
import { type NotificationType } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig, type ValueOf } from '~/libs/types/types.js';

import { name as sliceName } from './app.slice.js';

const navigate = createAction<ValueOf<typeof AppRoute> | null>(
  `${sliceName}/navigate`,
);

const notify = createAsyncThunk<
  unknown,
  {
    message: string;
    type: ValueOf<typeof NotificationType>;
  },
  AsyncThunkConfig
>(`${sliceName}/notify`, ({ type, message }, { extra }) => {
  const { notification } = extra;

  notification[type](message);
});

export { navigate, notify };
