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
  type SitesSearchRequestDto,
} from './libs/types/types.js';
import {
  siteCreateValidationSchema,
  siteGetByProjectValidationSchema,
  sitesSearchValidationSchema,
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
 *     SectionType:
 *       type: string
 *       enum:
 *         - header
 *         - footer
 *         - main
 *     Section:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           minimum: 1
 *         name:
 *           type: string
 *         type:
 *           $ref: '#/components/schemas/SectionType'
 *         content:
 *           type: object
 */

class SiteController extends Controller {
  private siteService: SiteService;

  public constructor(logger: ILogger, siteService: SiteService) {
    super(logger, ApiPath.SITES);

    this.siteService = siteService;

    this.addRoute({
      path: `${SitesApiPath.PROJECT_$PROJECT_ID}${SitesApiPath.ROOT}`,
      method: 'GET',
      validation: {
        params: siteGetByProjectValidationSchema,
        query: sitesSearchValidationSchema,
      },
      handler: (options) =>
        this.findAllByProjectId(
          options as ApiHandlerOptions<{
            params: SiteGetByProjectParametersDto;
            query: SitesSearchRequestDto;
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

    this.addRoute({
      path: SitesApiPath.$SITE_ID_SECTIONS,
      method: 'GET',
      handler: (options) =>
        this.findSectionsBySiteId(
          options as ApiHandlerOptions<{ params: { siteId: string } }>,
        ),
    });
  }

  /**
   * @swagger
   * /project/:projectId/sites:
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
  private async findAllByProjectId(
    options: ApiHandlerOptions<{
      params: SiteGetByProjectParametersDto;
      query: SitesSearchRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.siteService.findAllByProjectId(
        options.params.projectId,
        options.query,
      ),
    };
  }

  /**
   * @swagger
   * /project/:projectId/sites:
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
   *             industry:
   *               type: string
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

  /**
   * @swagger
   * /sites/{siteId}/sections:
   *   get:
   *     description: Returns object with items property. Items - array of sections related to site
   *     parameters:
   *       - in: path
   *         name: siteId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric Site ID
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
   *                     $ref: '#/components/schemas/Section'
   *                   minItems: 0
   */
  private async findSectionsBySiteId(
    options: ApiHandlerOptions<{ params: { siteId: string } }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.siteService.findSectionsBySiteId(
        Number(options.params.siteId),
      ),
    };
  }
}

export { SiteController };
