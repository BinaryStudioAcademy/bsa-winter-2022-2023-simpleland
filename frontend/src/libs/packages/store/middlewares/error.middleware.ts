import { type AnyAction, type Dispatch } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { notification } from '../../notification/notification.js';

const handleErrorMiddleware = () => {
  return (next: Dispatch): ((action: AnyAction) => unknown) =>
    (action: AnyAction) => {
      const result: unknown = next(action);
      if (isRejected(result) && !result.meta.rejectedWithValue) {
        const error =
          result.error.message ?? 'Unknown message redux toolkit error';
        return notification.error(error);
      }
      return result;
    };
};

export { handleErrorMiddleware };
