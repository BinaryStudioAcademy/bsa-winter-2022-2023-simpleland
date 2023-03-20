import { type FastifyInstance, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import {
  type HttpMethod,
  HttpCode,
  HttpError,
} from '~/libs/packages/http/http.js';

import { type AuthorizationPluginParameters } from './libs/types/authorization-plugin-parameters.type.js';

const authorization = fp(
  async (
    fastify: FastifyInstance,
    { whiteRoutesConfig, userService, token }: AuthorizationPluginParameters,
  ) => {
    fastify.decorateRequest('user', null);

    fastify.addHook('onRequest', async (request: FastifyRequest) => {
      const isWhiteRoute = whiteRoutesConfig.some((whiteRoute) => {
        const isWhitePath = whiteRoute.routerPath === request.routerPath;
        const isAllowedMethod = whiteRoute.methods.includes(
          request.method as HttpMethod,
        );

        return isWhitePath && isAllowedMethod;
      });

      if (isWhiteRoute) {
        return;
      }

      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        throw new HttpError({
          message: 'You should provide Authorization header',
          status: HttpCode.UNAUTHORIZED,
        });
      }

      const [, requestToken] = authorizationHeader.split(' ');

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
