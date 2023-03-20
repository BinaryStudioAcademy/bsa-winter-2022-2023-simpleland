import { type AnyAction, type Dispatch } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { type ExtraArguments } from '../types/types.js';

const handleError =
  ({ notification }: ExtraArguments) =>
  () => {
    return (next: Dispatch): ((action: AnyAction) => unknown) =>
      (action: AnyAction) => {
        const result: unknown = next(action);
        if (isRejected(result) && !result.meta.rejectedWithValue) {
          const error = result.error.message ?? 'Try again later';
          return notification.error(error);
        }
        return result;
      };
  };

export { handleError };
