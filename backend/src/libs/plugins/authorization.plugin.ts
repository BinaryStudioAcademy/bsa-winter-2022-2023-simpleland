import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';

import { type HttpMethod } from '../packages/http/http.js';
import { type WhiteRoutesConfig } from '../packages/white-routes-config/white-routes-config.js';

const authorization = fp(
  (
    fastify: FastifyInstance,
    { whiteRoutesConfig }: { whiteRoutesConfig: WhiteRoutesConfig },
    done: () => void,
  ) => {
    fastify.addHook(
      'onRequest',
      async (request: FastifyRequest, reply: FastifyReply) => {
        const isWhiteRoute = whiteRoutesConfig
          .getWhiteRoutes()
          .some(
            (whiteRoute) =>
              whiteRoute.routerPath === request.routerPath &&
              whiteRoute.httpMethods.includes(request.method as HttpMethod),
          );

        if (isWhiteRoute) {
          return;
        }

        await reply.code(403).send('TBA');
      },
    );

    done();
  },
);

export { authorization };
