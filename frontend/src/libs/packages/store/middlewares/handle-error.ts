import { type AnyAction } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { actions as appActions } from '~/slices/app/app.js';

import { NotificationType } from '../../notification/notification.js';
import { type store } from '../store.js';

const handleError = () => {
  return (next: typeof store.instance.dispatch) =>
    (action: AnyAction): unknown => {
      const result: unknown = next(action);

      if (isRejected(result) && !result.meta.rejectedWithValue) {
        const message = result.error.message ?? 'Try again later';

        return next(
          appActions.notify({ type: NotificationType.ERROR, message }),
        );
      }

      return result;
    };
};

export { handleError };
