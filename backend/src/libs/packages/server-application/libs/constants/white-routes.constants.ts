import { ApiPath } from '~/libs/enums/enums.js';
import { type WhiteRoutes } from '~/libs/packages/server-application/libs/types/types.js';
import { AuthApiPath } from '~/packages/auth/auth.js';

const WHITE_ROUTES: WhiteRoutes = [
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    methods: ['POST'],
  },
];

export { WHITE_ROUTES };
