import { createAction } from '@reduxjs/toolkit';

import { type NotificationType } from '~/libs/packages/notification/notification.js';

import { name as sliceName } from './app.slice.js';

const notify = createAction(
  `${sliceName}/notify`,
  (message: string, type: NotificationType = 'error') => {
    return {
      payload: {
        message,
        type,
      },
    };
  },
);

export { notify };
