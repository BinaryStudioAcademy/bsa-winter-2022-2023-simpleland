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
    routerPath: `/api/v1${ApiPath.SITES}${SitesApiPath.$SITE_ID_SECTIONS}`,
    methods: ['GET'],
  },
  {
    routerPath: `/api/v1${ApiPath.SITES}${SitesApiPath.$ID}`,
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation',
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation/static/*',
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation/static/swagger-initializer.js',
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation/json',
    methods: ['GET'],
  },
];

export { WHITE_ROUTES };
