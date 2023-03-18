import { config, tokenConfig } from '~/libs/packages/config/config.js';

import { Token } from './token-package.js';

const token = new Token(config, tokenConfig);

export { token };
