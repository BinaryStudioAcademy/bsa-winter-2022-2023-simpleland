import { type FastifyRequest } from 'fastify';

import { type UserAuthResponse } from '~/packages/users/users.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

type HeadersInjected = {
  headers: FastifyRequest['headers'];
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = HeadersInjected & {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: UserAuthResponse | null;
};

export { type ApiHandlerOptions };
