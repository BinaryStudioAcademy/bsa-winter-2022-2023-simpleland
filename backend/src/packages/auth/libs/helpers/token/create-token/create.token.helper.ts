import jwt from 'jsonwebtoken';

import { config } from '~/libs/packages/config/config.js';

const createToken = (data: number): string => {
  return jwt.sign({ data }, config.ENV.JWT.SECRET_KEY, {
    expiresIn: '24h',
  });
};

export { createToken };
