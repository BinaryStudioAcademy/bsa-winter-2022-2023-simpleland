const SitesApiPath = {
  ROOT: '/',
  SECTIONS_BY_SITE: '/:siteId/sections',
  PROJECT_$PROJECT_ID: '/project/:projectId',
} as const;

export { SitesApiPath };
