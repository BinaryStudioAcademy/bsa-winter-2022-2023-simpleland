import { config } from '~/libs/packages/config/config.js';

import { FileModel } from './file.model.js';
import { File } from './file.package.js';
import { FileRepository } from './file.repository.js';

const fileRepository = new FileRepository(FileModel);
const file = new File({ config, fileRepository });

export { file };
export { FileModel } from './file.model.js';
