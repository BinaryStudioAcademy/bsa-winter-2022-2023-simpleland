import { type authApi } from '~/packages/auth/auth.js';
import { type userApi } from '~/packages/users/users.js';

import { type notification } from '../../notification/notification.js';

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  notification: typeof notification;
};

export { type ExtraArguments };
