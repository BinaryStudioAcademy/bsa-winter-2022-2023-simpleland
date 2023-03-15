import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type SiteService } from '~/packages/sites/site.service.js';

import { SitesApiPath } from './libs/enums/enums.js';

class SiteController extends Controller {
  private siteService: SiteService;

  public constructor(logger: ILogger, siteService: SiteService) {
    super(logger, ApiPath.SITES);

    this.siteService = siteService;

    this.addRoute({
      path: SitesApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });
  }

  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.siteService.findAll(),
    };
  }
}

export { SiteController };
