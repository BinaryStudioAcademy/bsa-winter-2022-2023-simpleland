import { config } from '~/libs/packages/config/config.js';

import { OpenAI } from './open-ai.package.js';

const openAI = new OpenAI({ config });

export { openAI };
