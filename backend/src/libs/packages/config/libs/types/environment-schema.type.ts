import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    HOST: string;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
  };
  DB: {
    CONNECTION_STRING: string;
    DIALECT: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
  JWT: {
    SECRET_KEY: string;
  };
  OPEN_AI: {
    API_KEY: string;
  };
  AWS: {
    AWS_ACCESS_KEY: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_BUCKET_NAME: string;
  };
  STRIPE: {
    STRIPE_SECRET_KEY: string;
  };
};

export { type EnvironmentSchema };
