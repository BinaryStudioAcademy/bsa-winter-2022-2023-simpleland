import { encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { token } from '~/libs/packages/token/token.js';
import { userService } from '~/packages/users/users.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(userService, token, encrypt);
const authController = new AuthController(logger, authService);

export { authController, authService };
export { AuthApiPath } from './libs/enums/enums.js';
