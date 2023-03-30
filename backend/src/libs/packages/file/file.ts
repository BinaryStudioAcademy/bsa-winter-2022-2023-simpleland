import { config } from '~/libs/packages/config/config.js';

import { File } from './file.package.js';

const file = new File(config);

export { file };
export { FileModel } from './file.model.js';
