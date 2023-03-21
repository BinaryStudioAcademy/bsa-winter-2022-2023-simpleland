import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends Controller {
  private authService: AuthService;

  public constructor(logger: ILogger, authService: AuthService) {
    super(logger, ApiPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: 'POST',
      validation: {
        body: userSignUpValidationSchema,
      },
      handler: (options) =>
        this.signUp(
          options as ApiHandlerOptions<{
            body: UserSignUpRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: 'POST',
      validation: {
        body: userSignInValidationSchema,
      },
      handler: (options) =>
        this.signIn(
          options as ApiHandlerOptions<{
            body: UserSignInRequestDto;
          }>,
        ),
    });
    this.addRoute({
      path: AuthApiPath.CURRENT,
      method: 'GET',
      handler: (options) => this.getCurrent(options),
    });
  }

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      description: Sign up user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                password:
   *                  type: string
   *                firstName: string;
   *                lastName: string;
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
   *                    $ref: '#/components/schemas/User'
   */
  private async signUp(
    options: ApiHandlerOptions<{
      body: UserSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }

  /**
   * @swagger
   * /auth/sign-in:
   *    post:
   *      description: Sign in user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                password:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   */
  private async signIn(
    options: ApiHandlerOptions<{
      body: UserSignInRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(options.body),
    };
  }

  /**
   * @swagger
   * /auth/current:
   *    get:
   *      description: Get authenticated user
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              id:
   *                type: number
   *                format: int64
   *                minimum: 1
   *              email:
   *                type: string
   *                format: email
   *              firstName: string;
   *              lastName: string;
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   */
  private async getCurrent(
    options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse> {
    const [, token] = options.headers.authorization?.split(' ') ?? [];

    if (!token) {
      throw new HttpError({
        message:
          'You should provide Authorization header in format: Bearer <token>',
        status: HttpCode.UNAUTHORIZED,
      });
    }
    const user = await this.authService.getCurrent(token);

    return {
      status: HttpCode.OK,
      payload: user,
    };
  }
}

export { AuthController };
