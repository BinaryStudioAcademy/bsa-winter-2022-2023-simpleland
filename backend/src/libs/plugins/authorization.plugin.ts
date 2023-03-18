import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';

import { type HttpMethod, HttpCode } from '~/libs/packages/http/http.js';
import { type WhiteRoutes } from '~/libs/packages/server-application/server-application.js';

const authorization = fp(
  async (
    fastify: FastifyInstance,
    { whiteRoutesConfig }: { whiteRoutesConfig: WhiteRoutes },
  ) => {
    fastify.addHook(
      'onRequest',
      async (request: FastifyRequest, reply: FastifyReply) => {
        const isWhiteRoute = whiteRoutesConfig.some(
          (whiteRoute) =>
            whiteRoute.routerPath === request.routerPath &&
            whiteRoute.methods.includes(request.method as HttpMethod),
        );

        if (isWhiteRoute) {
          return;
        }

        await reply.code(HttpCode.UNAUTHORIZED);
      },
    );

    return await Promise.resolve();
  },
);

export { authorization };
