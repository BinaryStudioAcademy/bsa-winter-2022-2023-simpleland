import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  Notification,
  PageLayout,
  ProtectedRoute,
  RouterProvider,
  StoreProvider,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import { AccountSettings } from '~/pages/account-settings/account-settings.js';
import { Auth } from '~/pages/auth/auth.js';
import { MyProjects } from '~/pages/my-projects/my-projects.js';
import { NotFound } from '~/pages/not-found/not-found.js';
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
                    <PageLayout style="black">Root</PageLayout>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.START,
                element: (
                  <ProtectedRoute>
                    <Start />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.SITES_PROJECTS_$PROJECT_ID,
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
                path: AppRoute.MY_PROJECTS,
                element: (
                  <ProtectedRoute>
                    <MyProjects />,
                  </ProtectedRoute>
                ),
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
  </StrictMode>,
);
