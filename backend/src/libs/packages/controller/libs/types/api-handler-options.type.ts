import { type ServerAppRouteParameters } from '~/libs/packages/server-application/server-application.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

type DefaultApiHandlerOptions = {
  headers?: Parameters<ServerAppRouteParameters['handler']>[0]['headers'];
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserAuthResponse | null;
  fileBuffer?: Buffer | null;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  headers: Parameters<ServerAppRouteParameters['handler']>[0]['headers'];
  user: T['user'];
  fileBuffer: T['fileBuffer'];
};

export { type ApiHandlerOptions };
