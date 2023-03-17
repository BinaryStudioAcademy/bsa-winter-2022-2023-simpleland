import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { authController } from '~/packages/auth/auth.js';
import { projectController } from '~/packages/projects/projects.js';
import { siteController } from '~/packages/sites/sites.js';
import { userController } from '~/packages/users/users.js';

import { whiteRoutesConfig } from '../white-routes-config/white-routes-config.js';
import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
  'v1',
  config,
  ...authController.routes,
  ...userController.routes,
  ...siteController.routes,
  ...projectController.routes,
);
const serverApp = new ServerApp({
  config,
  logger,
  database,
  apis: [apiV1],
  whiteRoutesConfig,
});

export { serverApp };
export { type ServerAppRouteParameters } from './libs/types/types.js';
