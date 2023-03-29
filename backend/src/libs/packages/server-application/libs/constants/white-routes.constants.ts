import { ApiPath } from '~/libs/enums/enums.js';
import { type WhiteRoute } from '~/libs/packages/server-application/libs/types/types.js';
import { AuthApiPath } from '~/packages/auth/auth.js';
import { SitesApiPath } from '~/packages/sites/sites.js';

const WHITE_ROUTES: WhiteRoute[] = [
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.SITES}${SitesApiPath.SECTIONS_BY_SITE}`,
    methods: ['GET'],
  },
];

export { WHITE_ROUTES };
