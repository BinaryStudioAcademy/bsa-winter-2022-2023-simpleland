const ApiPath = {
  USERS: '/users',
  AUTH: '/auth',
  PROJECTS_$PROJECT_ID_SITES: '/projects/:projectId/sites',
  PROJECTS: '/projects',
} as const;

export { ApiPath };
