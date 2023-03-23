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
import { sitesApi } from '~/packages/sites/sites.js';
import { userApi } from '~/packages/users/users.js';
import { reducer as appReducer } from '~/slices/app/app.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as projectsReducer } from '~/slices/projects/projects.js';
import { reducer as sitesReducer } from '~/slices/sites/sites.js';
import { reducer as usersReducer } from '~/slices/users/users.js';

import { handleError } from './middlewares/middlewares.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  users: ReturnType<typeof usersReducer>;
  projects: ReturnType<typeof projectsReducer>;
  sites: ReturnType<typeof sitesReducer>;
  app: ReturnType<typeof appReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  userApi: typeof userApi;
  projectsApi: typeof projectsApi;
  sitesApi: typeof sitesApi;
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
        projects: projectsReducer,
        sites: sitesReducer,
        app: appReducer,
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
      projectsApi,
      sitesApi,
      notification,
      storage,
    };
  }
}

export { type ExtraArguments, Store };
