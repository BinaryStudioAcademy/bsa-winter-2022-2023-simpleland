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
  type ProjectSearchParameters,
  projectCreateValidationSchema,
  projectSearchValidationSchema,
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
        query: projectSearchValidationSchema,
      },
      handler: (options) =>
        this.findByUserId(
          options as ApiHandlerOptions<{
            query: ProjectSearchParameters;
            user: UserAuthResponse;
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
      query: ProjectSearchParameters;
      user: UserAuthResponse;
    }>,
  ): Promise<ApiHandlerResponse> {
    const projects = await this.projectService.findByUserId(
      options.query,
      options.user.id,
    );

    return {
      status: HttpCode.OK,
      payload: projects,
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
   *                userId:
   *                  type: number
   *                  format: int64
   *                  minimum: 1
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
      body: ProjectCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.projectService.create(options.body),
    };
  }
}

export { ProjectController };
