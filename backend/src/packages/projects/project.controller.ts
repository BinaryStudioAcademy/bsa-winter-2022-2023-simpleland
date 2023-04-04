import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type ProjectService } from '~/packages/projects/project.service.js';
import {
  type ProjectCreateRequestDto,
  type ProjectFilterQueryDto,
  projectCreateValidationSchema,
  projectFilterValidationSchema,
} from '~/packages/projects/projects.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

import { ProjectsApiPath } from './libs/enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Project:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *            minimum: 1
 *          name:
 *            type: string
 *          userId:
 *            type: number
 *            format: int64
 *            minimum: 1
 *          projectType:
 *          type: string
 *          enum:
 *          - eCommercial
 *          - Business
 *          - Blog
 *          - Portfolio
 *          - Personal
 *          - Nonprofit
 */

class ProjectController extends Controller {
  private projectService: ProjectService;

  public constructor(logger: ILogger, projectService: ProjectService) {
    super(logger, ApiPath.PROJECTS);

    this.projectService = projectService;

    this.addRoute({
      path: ProjectsApiPath.ROOT,
      method: 'GET',
      validation: {
        query: projectFilterValidationSchema,
      },
      handler: (options) =>
        this.findByUserId(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            query: ProjectFilterQueryDto;
          }>,
        ),
    });

    this.addRoute({
      path: ProjectsApiPath.ROOT,
      method: 'POST',
      validation: {
        body: projectCreateValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            body: ProjectCreateRequestDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /projects:
   *    get:
   *      description: Returns an array of projects
   *      parameters:
   *        - name: query
   *          description: The search query
   *          in: query
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Project'
   */
  private async findByUserId(
    options: ApiHandlerOptions<{
      user: UserAuthResponse;
      query: ProjectFilterQueryDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.projectService.findByUserId(
        options.user.id,
        options.query,
      ),
    };
  }

  /**
   * @swagger
   * /projects:
   *    post:
   *      description: Creates a new project
   *      requestBody:
   *        description: Object containing the user ID and project name
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                name:
   *                  type: string
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: '#/components/schemas/Project'
   */
  private async create(
    options: ApiHandlerOptions<{
      user: UserAuthResponse;
      body: ProjectCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.projectService.create({
        name: options.body.name,
        userId: options.user.id,
        type: options.body.type,
      }),
    };
  }
}

export { ProjectController };
