import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { SectionsApiPath } from './libs/enums/enums.js';
import {
  type SectionUpdateParametersDto,
  type SectionUpdateRequestDto,
} from './libs/types/types.js';
import { sectionUpdateValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { type SectionService } from './section.service.js';

class SectionController extends Controller {
  private sectionService: SectionService;

  public constructor(logger: ILogger, sectionService: SectionService) {
    super(logger, ApiPath.SECTIONS);

    this.sectionService = sectionService;

    this.addRoute({
      path: SectionsApiPath.$ID,
      method: 'PUT',
      validation: { body: sectionUpdateValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: SectionUpdateRequestDto;
            params: SectionUpdateParametersDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /sections/:id:
   *   put:
   *     description: Updates section content
   *     parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: integer
   *          required: true
   *          description: Numeric Section ID
   *     requestBody:
   *       description: Section update payload
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *              type:
   *                $ref: '#/components/schemas/SectionType'
   *              content:
   *                oneOf:
   *                  - type: object
   *                    properties:
   *                      logo:
   *                        type: string
   *                      phone:
   *                        type: string
   *     responses:
   *       200:
   *         description: Successful update
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Section'
   */
  private async update({
    body,
    params,
  }: ApiHandlerOptions<{
    body: SectionUpdateRequestDto;
    params: SectionUpdateParametersDto;
  }>): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.sectionService.update({
        ...params,
        ...body,
      }),
    };
  }
}

export { SectionController };
