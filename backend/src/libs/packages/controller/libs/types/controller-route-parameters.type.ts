import { type HttpMethod } from '~/libs/packages/http/http.js';
import { type ValidationSchema } from '~/libs/types/types.js';

import { type ApiHandler } from './api-handler.type.js';

type ControllerRouteParameters = {
  path: string;
  method: HttpMethod;
  handler: ApiHandler;
  validation?: {
    query?: ValidationSchema;
    body?: ValidationSchema;
    params?: ValidationSchema;
  };
};

export { type ControllerRouteParameters };
