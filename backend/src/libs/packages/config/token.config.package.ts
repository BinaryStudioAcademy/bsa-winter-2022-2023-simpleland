import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type ITokenConfig } from './libs/interfaces/interfaces.js';
import { type AuthConfig } from './libs/types/auth-config.type.js';

class TokenConfig implements ITokenConfig {
  private logger: ILogger;

  public AUTH: AuthConfig;
  public constructor(logger: ILogger) {
    this.logger = logger;

    config();

    this.authConfig.load({});
    this.authConfig.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });

    this.AUTH = this.authConfig.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  private get authConfig(): TConfig<AuthConfig> {
    return convict<AuthConfig>({
      ALGORITHM: {
        doc: 'Encoding algorithm',
        format: String,
        env: 'ALGORITHM',
        default: null,
      },
      EXP_TIME: {
        doc: 'Token expiration time',
        format: String,
        env: 'EXP_TIME',
        default: null,
      },
    });
  }
}

export { TokenConfig };
