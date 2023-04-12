import {
  type FastifyInstance,
  type FastifyPluginAsync,
  type FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';

import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import {
  type SectionService,
  type SectionUpdateParametersDto,
} from '~/packages/sections/sections.js';
import { type SiteService } from '~/packages/sites/sites.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

import { SECTION_EDITING_ROUTE } from './libs/constants/constants.js';

type SectionEditingPermissionPluginParameters = {
  sectionService: SectionService;
  siteService: SiteService;
};

const sectionEditingPermission: FastifyPluginAsync<SectionEditingPermissionPluginParameters> =
  fp(
    async (
      fastify: FastifyInstance,
      { sectionService, siteService }: SectionEditingPermissionPluginParameters,
    ) => {
      fastify.addHook(
        'onRequest',
        async ({
          params,
          user,
          method,
          routerPath,
        }: FastifyRequest<{
          Params: SectionUpdateParametersDto;
        }>) => {
          const isSectionEditPath =
            routerPath === SECTION_EDITING_ROUTE.routerPath;
          const isSectionEditMethod = method === SECTION_EDITING_ROUTE.method;

          const isRestrictedRoute = isSectionEditPath && isSectionEditMethod;

          if (!isRestrictedRoute) {
            return;
          }

          const requestUser = user as UserAuthResponse;

          const siteId = await sectionService.getSiteId(Number(params.id));
          const site = await siteService.find(siteId);

          const isOwner = site.userId === requestUser.id;

          if (!isOwner) {
            throw new HttpError({
              message: 'Only owner can edit site',
              status: HttpCode.UNAUTHORIZED,
            });
          }

          const isSubscribed = Boolean(requestUser.subscriptionEndDate);

          if (!isSubscribed) {
            throw new HttpError({
              message: 'This is subscribers only feature',
              status: HttpCode.UNAUTHORIZED,
            });
          }
        },
      );

      return await Promise.resolve();
    },
  );

export { sectionEditingPermission };
