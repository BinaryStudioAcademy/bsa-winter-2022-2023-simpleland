import { config } from '~/libs/packages/config/config.js';

import { Token } from './token.package.js';

const token = new Token(config);

export { type IToken } from './libs/interfaces/interfaces.js';
export { type Token } from '~/libs/packages/token/token.package.js';
export { token };
