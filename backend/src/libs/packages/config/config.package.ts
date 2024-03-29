import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type IConfig } from './libs/interfaces/interfaces.js';
import {
  type AuthConfig,
  type EncryptConfig,
  type EnvironmentSchema,
} from './libs/types/types.js';

class Config implements IConfig {
  private logger: ILogger;

  public AUTH: AuthConfig;

  public ENV: EnvironmentSchema;

  public ENCRYPTION: EncryptConfig;

  public constructor(logger: ILogger) {
    this.logger = logger;

    config();

    this.envSchema.load({});
    this.envSchema.validate({
      allowed: 'strict',
      output: (message) => this.logger.info(message),
    });
    this.ENV = this.envSchema.getProperties();

    this.logger.info('.env file found and successfully parsed!');

    this.AUTH = this.authConfig;
    this.ENCRYPTION = this.encryptionConfig;
  }

  private get envSchema(): TConfig<EnvironmentSchema> {
    return convict<EnvironmentSchema>({
      APP: {
        ENVIRONMENT: {
          doc: 'Application environment',
          format: Object.values(AppEnvironment),
          env: 'NODE_ENV',
          default: null,
        },
        PORT: {
          doc: 'Port for incoming connections',
          format: Number,
          env: 'PORT',
          default: null,
        },
        HOST: {
          doc: 'Host for server app',
          format: String,
          env: 'HOST',
          default: null,
        },
      },
      DB: {
        CONNECTION_STRING: {
          doc: 'Database connection string',
          format: String,
          env: 'DB_CONNECTION_STRING',
          default: null,
        },
        DIALECT: {
          doc: 'Database dialect',
          format: String,
          env: 'DB_DIALECT',
          default: null,
        },
        POOL_MIN: {
          doc: 'Database pool min count',
          format: Number,
          env: 'DB_POOL_MIN',
          default: null,
        },
        POOL_MAX: {
          doc: 'Database pool max count',
          format: Number,
          env: 'DB_POOL_MAX',
          default: null,
        },
      },
      JWT: {
        SECRET_KEY: {
          doc: 'Secret key for token generation',
          format: String,
          env: 'SECRET_KEY',
          default: null,
        },
      },
      OPEN_AI: {
        API_KEY: {
          doc: 'OpenAI secret API key',
          format: String,
          env: 'AI_ENGINE_SECRET_KEY',
          default: null,
        },
      },
      AWS: {
        AWS_ACCESS_KEY: {
          doc: 'AWS access key',
          format: String,
          env: 'AWS_ACCESS_KEY',
          default: null,
        },
        AWS_SECRET_ACCESS_KEY: {
          doc: 'AWS secret access key',
          format: String,
          env: 'AWS_SECRET_ACCESS_KEY',
          default: null,
        },
        AWS_REGION: {
          doc: 'AWS region',
          format: String,
          env: 'AWS_REGION',
          default: null,
        },
        AWS_BUCKET_NAME: {
          doc: 'AWS bucket name',
          format: String,
          env: 'AWS_BUCKET_NAME',
          default: null,
        },
      },
      STRIPE: {
        STRIPE_SECRET_KEY: {
          doc: 'Stripe secret key',
          format: String,
          env: 'STRIPE_SECRET_KEY',
          default: null,
        },
      },
    });
  }

  private get authConfig(): AuthConfig {
    return {
      ALGORITHM: 'HS256',
      EXP_TIME: '24h',
    };
  }

  private get encryptionConfig(): EncryptConfig {
    return {
      USER_PASSWORD_SALT_ROUNDS: 10,
    };
  }
}

export { Config };
