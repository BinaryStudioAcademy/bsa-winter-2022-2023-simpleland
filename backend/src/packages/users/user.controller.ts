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
  type UserUpdateRequestDto,
} from './libs/types/types.js';
import { userUpdateValidationSchema } from './libs/validation-schemas/validation-schemas.js';

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
      method: 'POST',
      validation: { body: userUpdateValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: UserUpdateRequestDto;
            user: UserAuthResponse;
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
   *    post:
   *      description: Updating user details. Returning user
   *      requestBody:
   *        description: User details
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                firstName: string;
   *                lastName: string;
   *                accountName: string;
   *      responses:
   *        200:
   *          description: Successful update
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  id:
   *                    type: number;
   *                    format: int64;
   *                    minimum: 1;
   *                  firstName: string;
   *                  lastName: string;
   *                  email:
   *                    type: string;
   *                    format: email;
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
}

export { UserController };
