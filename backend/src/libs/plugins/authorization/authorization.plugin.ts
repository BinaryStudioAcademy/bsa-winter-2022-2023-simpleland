import { type FastifyInstance, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import {
  type HttpMethod,
  HttpCode,
  HttpError,
} from '~/libs/packages/http/http.js';
import { type WhiteRoute } from '~/libs/packages/server-application/server-application.js';
import { type Token } from '~/libs/packages/token/token.package';
import { type UserService } from '~/packages/users/user.service';

type AuthorizationPluginParameters = {
  whiteRoutesConfig: WhiteRoute[];
  userService: UserService;
  token: Token;
};

const authorization = fp(
  async (
    fastify: FastifyInstance,
    { whiteRoutesConfig, userService, token }: AuthorizationPluginParameters,
  ) => {
    fastify.decorateRequest('user', null);

    fastify.addHook('onRequest', async (request: FastifyRequest) => {
      const { headers, method, routerPath } = request;

      const isStaticPagePath = routerPath === '/*';

      if (isStaticPagePath) {
        return;
      }

      const isWhiteRoute = whiteRoutesConfig.some((whiteRoute) => {
        const isWhitePath = whiteRoute.routerPath === routerPath;
        const isAllowedMethod = whiteRoute.methods.includes(
          method as HttpMethod,
        );

        return isWhitePath && isAllowedMethod;
      });

      if (isWhiteRoute) {
        return;
      }

      const [, requestToken] = headers.authorization?.split(' ') ?? [];

      if (!requestToken) {
        throw new HttpError({
          message: 'Authorization header should be in format: Bearer <token>',
          status: HttpCode.UNAUTHORIZED,
        });
      }

      const { userId } = token.decode<{ userId: number }>(requestToken);

      const user = await userService.find(userId);

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
