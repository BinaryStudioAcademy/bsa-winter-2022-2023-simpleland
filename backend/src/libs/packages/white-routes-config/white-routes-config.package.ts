import { ApiPath } from '~/libs/enums/enums.js';
import { AuthApiPath } from '~/packages/auth/libs/enums/enums.js';

import { type IWhiteRoutesConfig } from './libs/interfaces/interfaces.js';
import { type WhiteRoutes } from './libs/types/white-routes.type.js';

class WhiteRoutesConfig implements IWhiteRoutesConfig {
  private whiteRoutes: WhiteRoutes;

  public constructor() {
    this.whiteRoutes = this.initWhiteRoutes();
  }

  public getWhiteRoutes(): WhiteRoutes {
    return this.whiteRoutes;
  }

  private createWhiteRoute(...paths: string[]): string {
    return `/api/v1${paths.join('')}`;
  }

  private initWhiteRoutes(): WhiteRoutes {
    return [
      {
        routerPath: this.createWhiteRoute(ApiPath.AUTH, AuthApiPath.SIGN_IN),
        httpMethods: ['POST'],
      },
      {
        routerPath: this.createWhiteRoute(ApiPath.AUTH, AuthApiPath.SIGN_UP),
        httpMethods: ['POST'],
      },
    ];
  }
}

export { WhiteRoutesConfig };
