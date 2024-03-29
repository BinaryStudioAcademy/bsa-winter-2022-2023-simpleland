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
  projectUpdateValidationSchema,
} from '~/packages/projects/projects.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

import { ProjectsApiPath } from './libs/enums/enums.js';
import { type ProjectUploadImageParametersDto } from './libs/types/types.js';

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
 *          avatarUrl:
 *            type: string
 *            format: uri
 *            nullable: true
 *          category:
 *            type: string
 *            enum:
 *              - e-commercial
 *              - business
 *              - blog
 *              - portfolio
 *              - personal
 *              - nonprofit
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
      path: ProjectsApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.find(
          options as ApiHandlerOptions<{
            params: { id: number };
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

    this.addRoute({
      path: ProjectsApiPath.$ID,
      method: 'PUT',
      validation: { body: projectUpdateValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: { id: number };
            body: ProjectCreateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: ProjectsApiPath.$PROJECT_ID_AVATAR,
      method: 'PUT',
      handler: (options) =>
        this.uploadImage(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            params: ProjectUploadImageParametersDto;
            fileBuffer: Buffer;
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
   * /projects/{id}:
   *   get:
   *     description: Get a project by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the project to retrieve
   *     responses:
   *       '200':
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Project'
   */

  private async find(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const { id } = options.params;

    return {
      status: HttpCode.OK,
      payload: await this.projectService.find(id),
    };
  }

  /**
   * @swagger
   * /projects:
   *    post:
   *      description: Creates a new project
   *      security:
   *        - bearerAuth: []
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
   *                category:
   *                  type: string
   *                  enum:
   *                    - e-commercial
   *                    - business
   *                    - blog
   *                    - portfolio
   *                    - personal
   *                    - nonprofit
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
        category: options.body.category,
      }),
    };
  }

  /**
   * @swagger
   * /projects/:id:
   *    put:
   *      description: Updating project name and category. Returning project
   *      requestBody:
   *        description: Project name and description
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                name: string;
   *                category: string;
   *      responses:
   *        200:
   *          description: Successful update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Project'
   */

  private async update(
    options: ApiHandlerOptions<{
      params: { id: number };
      body: ProjectCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.projectService.update(
        options.params.id,
        options.body,
      ),
    };
  }

  /**
   * @swagger
   * /projects/:projectId/avatar:
   *    put:
   *      description: Updating project image. Returning project
   *      parameters:
   *        - in: path
   *          name: projectId
   *          schema:
   *            type: integer
   *          required: true
   *          description: Numeric Project ID
   *      requestBody:
   *        description: Project image and project id
   *        required: true
   *        content:
   *          multipart/form-data:
   *            schema:
   *              type: object
   *              properties:
   *                file:
   *                  type: string
   *                  format: binary
   *      responses:
   *        200:
   *          description: Successful image update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Project'
   */

  private async uploadImage({
    user,
    params,
    fileBuffer,
  }: ApiHandlerOptions<{
    user: UserAuthResponse;
    params: ProjectUploadImageParametersDto;
    fileBuffer: Buffer;
  }>): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.projectService.uploadImage(
        user.id,
        params,
        fileBuffer,
      ),
    };
  }
}

export { ProjectController };
