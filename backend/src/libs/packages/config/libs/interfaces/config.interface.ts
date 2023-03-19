import { type IConfig as ILibraryConfig } from 'shared/build/index.js';

import { type AuthConfig, type EnvironmentSchema } from '../types/types.js';

interface IConfig extends ILibraryConfig<EnvironmentSchema, AuthConfig> {}

export { type IConfig };
