import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type SiteService } from '~/packages/sites/site.service.js';

import { SitesApiPath } from './libs/enums/enums.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Site:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           minimum: 1
 *         name:
 *           type: string
 *         publishedUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 */

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

  /**
   * @swagger
   * /sites:
   *   get:
   *     description: Returns an object with items property. Items - array of sites.
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 items:
   *                   type: array
   *                   items
   *                     $ref: '#/components/schemas/Site'
   *                   minItems: 0
   */

  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.siteService.findAll(),
    };
  }
}

export { SiteController };
