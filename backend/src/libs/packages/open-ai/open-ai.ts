import { config } from '~/libs/packages/config/config.js';
import { file } from '~/libs/packages/file/file.js';

import { OpenAI } from './open-ai.package.js';

const openAI = new OpenAI({ config, file });

export { openAI };
