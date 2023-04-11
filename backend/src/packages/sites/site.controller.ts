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
  type SiteCreateParametersDto,
  type SiteCreateRequestDto,
  type SitesFilterQueryDto,
  type SitesGetByProjectIdParametersDto,
} from './libs/types/types.js';
import {
  siteCreateValidationSchema,
  siteGetByProjectIdValidationSchema,
  sitesFilterValidationSchema,
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
 *         projectId:
 *           type: number
 *           format: int64
 *           minimum: 1
 *         publishedUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *         image:
 *           type: string
 *           format: uri
 *           nullable: true
 *     SectionType:
 *       type: string
 *       enum:
 *         - header
 *         - footer
 *         - main
 *         - about
 *         - feedback
 *         - services
 *         - portfolio
 *     Section:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           minimum: 1
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
      path: SitesApiPath.PROJECT_$PROJECT_ID,
      method: 'GET',
      validation: {
        params: siteGetByProjectIdValidationSchema,
        query: sitesFilterValidationSchema,
      },
      handler: (options) =>
        this.findAllByProjectId(
          options as ApiHandlerOptions<{
            params: SitesGetByProjectIdParametersDto;
            query: SitesFilterQueryDto;
          }>,
        ),
    });

    this.addRoute({
      path: SitesApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.find(
          options as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: SitesApiPath.PROJECT_$PROJECT_ID,
      method: 'POST',
      validation: {
        body: siteCreateValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: SiteCreateRequestDto;
            params: SiteCreateParametersDto;
          }>,
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
   *     parameters:
   *        - in: path
   *          name: projectId
   *          schema:
   *            type: integer
   *          required: true
   *          description: Numeric Project ID
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
      params: SitesGetByProjectIdParametersDto;
      query: SitesFilterQueryDto;
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
   * /sites/{id}:
   *   get:
   *     description: Get a site by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the site to retrieve
   *     responses:
   *       '200':
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Site'
   */

  private async find(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const { id } = options.params;

    return {
      status: HttpCode.OK,
      payload: await this.siteService.find(id),
    };
  }

  /**
   * @swagger
   * /sites/project/:projectId:
   *   post:
   *     description: Create a site. Returns object with site info
   *     parameters:
   *        - in: path
   *          name: projectId
   *          schema:
   *            type: integer
   *          required: true
   *          description: Numeric Project ID
   *     requestBody:
   *       description: Site payload
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *              name:
   *                type: string
   *              industry:
   *                type: string
   *              tone:
   *                type: string
   *                enum:
   *                  - official
   *                  - not official
   *              targetAudience:
   *                type: string
   *                enum:
   *                  - kids
   *                  - teenager
   *                  - young-adult
   *                  - adult
   *                  - elderly
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
      params: SiteCreateParametersDto;
      body: SiteCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.siteService.create({
        ...options.body,
        projectId: options.params.projectId,
      }),
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
