import { type AnyAction, type Dispatch } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { actions as appActions } from '~/slices/app/app.js';

const handleError = () => {
  return (next: Dispatch): ((action: AnyAction) => unknown) =>
    (action: AnyAction) => {
      const result: unknown = next(action);
      if (isRejected(result) && !result.meta.rejectedWithValue) {
        const error = result.error.message ?? 'Try again later';
        return next(appActions.notify(error));
      }
      return result;
    };
};

export { handleError };
