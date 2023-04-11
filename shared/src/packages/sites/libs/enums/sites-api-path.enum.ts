const SitesApiPath = {
  ROOT: '/',
  $ID: '/:id',
  $SITE_ID_SECTIONS: '/:siteId/sections',
  PROJECT_$PROJECT_ID: '/project/:projectId',
} as const;

export { SitesApiPath };
