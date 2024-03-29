import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type UserService } from '~/packages/users/user.service.js';

import { UsersApiPath } from './libs/enums/enums.js';
import {
  type UserAuthResponse,
  type UserUpdateLoginRequestDto,
  type UserUpdatePasswordRequestDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';
import {
  userUpdateLoginValidationSchema,
  userUpdatePasswordValidationSchema,
  userUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 *          firstName:
 *             type: string
 *          lastName:
 *              type: string
 *          accountName:
 *            type: string
 *            nullable: true
 *          avatarUrl:
 *            type: string
 *            format: uri
 *            nullable: true
 */
class UserController extends Controller {
  private userService: UserService;

  public constructor(logger: ILogger, userService: UserService) {
    super(logger, ApiPath.USERS);

    this.userService = userService;

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'PUT',
      validation: { body: userUpdateValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: UserUpdateRequestDto;
            user: UserAuthResponse;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.UPDATE_PASSWORD,
      method: 'PUT',
      validation: { body: userUpdatePasswordValidationSchema },
      handler: (options) =>
        this.updatePassword(
          options as ApiHandlerOptions<{
            body: UserUpdatePasswordRequestDto;
            user: UserAuthResponse;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.UPDATE_LOGIN,
      method: 'PUT',
      validation: { body: userUpdateLoginValidationSchema },
      handler: (options) =>
        this.updateLogin(
          options as ApiHandlerOptions<{
            body: UserUpdateLoginRequestDto;
            user: UserAuthResponse;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.AVATAR,
      method: 'PUT',
      handler: (options) =>
        this.updateAvatar(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            fileBuffer: Buffer;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /users:
   *    get:
   *      description: Returns an array of users
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/User'
   */
  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.findAll(),
    };
  }

  /**
   * @swagger
   * /users:
   *    put:
   *      description: Updating user details. Returning user
   *      requestBody:
   *        description: User details
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                firstName:
   *                  type: string
   *                lastName:
   *                  type: string
   *                accountName:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  private async update(
    options: ApiHandlerOptions<{
      body: UserUpdateRequestDto;
      user: UserAuthResponse;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.update(options.user.id, options.body),
    };
  }

  /**
   * @swagger
   * /users/password:
   *    patch:
   *      description: Updating password. Returning user
   *      requestBody:
   *        description: passwords
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                password:
   *                  type: string
   *                newPassword:
   *                   type: string
   *      responses:
   *        200:
   *          description: Successful update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  private async updatePassword(
    options: ApiHandlerOptions<{
      body: UserUpdatePasswordRequestDto;
      user: UserAuthResponse;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.updatePassword(
        options.user.id,
        options.body,
      ),
    };
  }

  /**
   * @swagger
   * /users/update-login:
   *    patch:
   *      description: Updating login. Returning user
   *      requestBody:
   *        description: Updates user login. Returns user
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                login:
   *                  type: string
   *                repeatLogin:
   *                   type: string
   *      responses:
   *        200:
   *          description: Successful update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */

  private async updateLogin(
    options: ApiHandlerOptions<{
      body: UserUpdateLoginRequestDto;
      user: UserAuthResponse;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.updateLogin(
        options.user.id,
        options.body,
      ),
    };
  }

  /**
   * @swagger
   * /users/avatar:
   *    put:
   *      description: Updating user avatar. Returning user
   *      requestBody:
   *        description: User avatar
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
   *          description: Successful avatar update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  private async updateAvatar({
    user,
    fileBuffer,
  }: ApiHandlerOptions<{
    user: UserAuthResponse;
    fileBuffer: Buffer;
  }>): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.updateAvatar(user.id, fileBuffer),
    };
  }
}

export { UserController };
