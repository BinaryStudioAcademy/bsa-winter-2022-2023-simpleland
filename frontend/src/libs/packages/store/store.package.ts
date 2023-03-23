import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { storage } from '~/libs/packages/storage/storage.js';
import { authApi } from '~/packages/auth/auth.js';
import { projectsApi } from '~/packages/projects/projects.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as appReducer } from '~/slices/app/app.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as projectsReducer } from '~/slices/projects/projects.js';
import { reducer as usersReducer } from '~/slices/users/users.js';

import { handleError } from './middlewares/middlewares.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
  app: ReturnType<typeof appReducer>;
  projects: ReturnType<typeof projectsReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  projectsApi: typeof projectsApi;
  storage: typeof storage;
  notification: typeof notification;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]>
    >
  >;

  public constructor(config: IConfig) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
        users: usersReducer,
        app: appReducer,
        projects: projectsReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return [
          handleError,
          ...getDefaultMiddleware({
            thunk: {
              extraArgument: this.extraArguments,
            },
          }),
        ];
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      userApi,
      notification,
      projectsApi,
      storage,
    };
  }
}

export { type ExtraArguments, Store };
