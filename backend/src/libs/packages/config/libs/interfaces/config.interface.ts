import {
  type IConfig as ILibraryConfig,
  type ITokenConfig as ITokenLibraryConfig,
} from 'shared/build/index.js';

import { type AuthConfig } from '../types/auth-config.type.js';
import { type EnvironmentSchema } from '../types/types.js';

interface IConfig extends ILibraryConfig<EnvironmentSchema> {}
interface ITokenConfig extends ITokenLibraryConfig<AuthConfig> {}

export { type IConfig, type ITokenConfig };
