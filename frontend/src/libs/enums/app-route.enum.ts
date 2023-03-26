const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MY_PROJECTS: '/my-projects',
  SITES_PROJECTS_$PROJECT_ID: '/sites/project/:projectId',
  START: '/start',
  PROFILE: '/profile',
  ANY: '*',
} as const;

export { AppRoute };
