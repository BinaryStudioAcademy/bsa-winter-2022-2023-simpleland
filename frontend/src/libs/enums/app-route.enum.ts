const ProjectsDetailsRoute = {
  root: '/projects',
  $id: '/:projectId',
  sites: '/sites',
};

const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROJECTS: ProjectsDetailsRoute.root,
  SITES: `${ProjectsDetailsRoute.root}${ProjectsDetailsRoute.$id}${ProjectsDetailsRoute.sites}`,
  PROFILE: '/profile',
  ANY: '*',
} as const;

export { AppRoute, ProjectsDetailsRoute };
