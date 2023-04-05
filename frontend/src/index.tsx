import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  Notification,
  ProtectedRoute,
  RouterProvider,
  StoreProvider,
  Tooltip,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import { AccountSettings } from '~/pages/account-settings/account-settings.js';
import { Auth } from '~/pages/auth/auth.js';
import { MyProjects } from '~/pages/my-projects/my-projects.js';
import { NotFound } from '~/pages/not-found/not-found.js';
import { Root } from '~/pages/root/root.js';
import { Site } from '~/pages/site/site.js';
import { Sites } from '~/pages/sites/sites.js';
import { Start } from '~/pages/start/start.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider
        routes={[
          {
            path: AppRoute.ROOT,
            element: <App />,
            children: [
              {
                path: AppRoute.ROOT,
                element: (
                  <ProtectedRoute>
                    <Root />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.PROJECTS_$PROJECT_ID_START,
                element: (
                  <ProtectedRoute>
                    <Start />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.PROJECTS_$PROJECT_ID_SITES,
                element: (
                  <ProtectedRoute>
                    <Sites />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.PROFILE,
                element: (
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.LOGIN,
                element: (
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.SUBSCRIPTION,
                element: (
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.MY_PROJECTS,
                element: (
                  <ProtectedRoute>
                    <MyProjects />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.SITES_$SITE_ID,
                element: <Site />,
              },
              {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
              },
            ],
          },
          {
            path: AppRoute.ANY,
            element: <NotFound />,
          },
        ]}
      />
    </StoreProvider>
    <Notification />
    <Tooltip />
  </StrictMode>,
);
