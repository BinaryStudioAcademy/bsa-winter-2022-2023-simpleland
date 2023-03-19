import { type FastifyInstance, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import {
  type HttpMethod,
  HttpCode,
  HttpError,
} from '~/libs/packages/http/http.js';
import { type WhiteRoutes } from '~/libs/packages/server-application/server-application.js';
import { token } from '~/libs/packages/token/token.js';
import { userService } from '~/packages/users/users.js';

const authorization = fp(
  async (
    fastify: FastifyInstance,
    { whiteRoutesConfig }: { whiteRoutesConfig: WhiteRoutes },
  ) => {
    fastify.decorateRequest('user', null);

    fastify.addHook('onRequest', async (request: FastifyRequest) => {
      const isWhiteRoute = whiteRoutesConfig.some(
        (whiteRoute) =>
          whiteRoute.routerPath === request.routerPath &&
          whiteRoute.methods.includes(request.method as HttpMethod),
      );

      if (isWhiteRoute) {
        return;
      }

      const [, requestToken] = request.headers.authorization?.split(' ') ?? [];

      const { id } = await token.verify(requestToken);

      const user = await userService.find(id as number);

      if (!user) {
        throw new HttpError({
          message: 'Invalid token',
          status: HttpCode.UNAUTHORIZED,
        });
      }

      request.user = user;
    });

    return await Promise.resolve();
  },
);

export { authorization };
