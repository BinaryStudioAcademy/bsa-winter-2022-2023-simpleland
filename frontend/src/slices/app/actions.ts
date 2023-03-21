import { createAsyncThunk } from '@reduxjs/toolkit';

import { type NotificationType } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import { type ValueOf } from '~/libs/types/types.js';

import { name as sliceName } from './app.slice.js';

type Notification = {
  message: string;
  type: ValueOf<typeof NotificationType>;
};

const notify = createAsyncThunk<unknown, Notification, AsyncThunkConfig>(
  `${sliceName}/notify`,
  ({ type, message }, { extra }) => {
    const { notification } = extra;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    notification[type](message);
  },
);

export { notify };
