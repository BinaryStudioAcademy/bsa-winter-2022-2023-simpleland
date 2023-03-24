const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MY_PROJECTS: '/my-projects',
  PROJECTS_$PROJECT_ID_SITES: '/projects/:projectId/sites',
  PROFILE: '/profile',
  ANY: '*',
} as const;

export { AppRoute };
