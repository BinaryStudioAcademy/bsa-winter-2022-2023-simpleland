import { logger } from '~/libs/packages/logger/logger.js';

import { Config } from './config.package.js';
import { TokenConfig } from './token.config.package.js';

const config = new Config(logger);
const tokenConfig = new TokenConfig(logger);

export { config };
export { tokenConfig };
export { type IConfig } from './libs/interfaces/interfaces.js';
