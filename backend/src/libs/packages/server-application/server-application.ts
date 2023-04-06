import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { authController } from '~/packages/auth/auth.js';
import { projectController } from '~/packages/projects/projects.js';
import { sectionController } from '~/packages/sections/sections.js';
import { siteController } from '~/packages/sites/sites.js';
import { userController } from '~/packages/users/users.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
  'v1',
  config,
  ...authController.routes,
  ...userController.routes,
  ...siteController.routes,
  ...projectController.routes,
  ...sectionController.routes,
);
const serverApp = new ServerApp({
  config,
  logger,
  database,
  apis: [apiV1],
});

export { serverApp };
export {
  type ServerAppRouteParameters,
  type WhiteRoute,
} from './libs/types/types.js';
