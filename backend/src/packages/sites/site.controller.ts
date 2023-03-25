import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type SiteService } from '~/packages/sites/site.service.js';

import { SitesApiPath } from './libs/enums/enums.js';
import {
  type SiteCreateRequestDto,
  type SiteGetByProjectParametersDto,
} from './libs/types/types.js';
import {
  siteCreateValidationSchema,
  siteGetByProjectValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

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
    super(logger, ApiPath.PROJECTS_$PROJECT_ID_SITES);

    this.siteService = siteService;

    this.addRoute({
      path: SitesApiPath.ROOT,
      method: 'GET',
      validation: {
        params: siteGetByProjectValidationSchema,
      },
      handler: (options) =>
        this.findByProjectId(
          options as ApiHandlerOptions<{
            params: SiteGetByProjectParametersDto;
          }>,
        ),
    });

    this.addRoute({
      path: SitesApiPath.ROOT,
      method: 'POST',
      validation: {
        body: siteCreateValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{ body: SiteCreateRequestDto }>,
        ),
    });
  }

  /**
   * @swagger
   * /projects/:projectId/sites:
   *   get:
   *     description: Returns an object with items property. Items - array of sites by specific project.
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
   *                   items:
   *                     $ref: '#/components/schemas/Site'
   *                   minItems: 0
   */
  private async findByProjectId(
    options: ApiHandlerOptions<{ params: SiteGetByProjectParametersDto }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.siteService.findByProjectId(options.params.projectId),
    };
  }

  /**
   * @swagger
   * /projects/:projectId/sites:
   *   post:
   *     description: Create a site. Returns object with site info
   *     requestBody:
   *       description: Site payload
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             name:
   *               type: string
   *             publishedUrl:
   *               type: string
   *               format: uri
   *               nullable: true
   *     responses:
   *       201:
   *         description: Successful creation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Site'
   *
   */
  private async create(
    options: ApiHandlerOptions<{
      body: SiteCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.siteService.create(options.body),
    };
  }
}

export { SiteController };
