const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MY_PROJECTS: '/my-projects',
  PROJECTS_$PROJECT_ID_SITES: '/projects/:projectId/sites',
  PROJECTS_$PROJECT_ID_START: '/projects/:projectId/start',
  PROFILE: '/profile',
  SITES_$SITE_ID: '/sites/:siteId',
  LOGIN: '/login',
  SUBSCRIPTION: '/subscription',
  DOMAIN: '/domain',
  ANY: '*',
} as const;

export { AppRoute };
