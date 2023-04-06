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
import { type SectionService } from './section.service.js';

class SectionController extends Controller {
  private sectionService: SectionService;

  public constructor(logger: ILogger, sectionService: SectionService) {
    super(logger, ApiPath.SECTIONS);

    this.sectionService = sectionService;

    this.addRoute({
      path: SectionsApiPath.$ID,
      method: 'PUT',
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: SectionUpdateRequestDto;
            params: SectionUpdateParametersDto;
          }>,
        ),
    });
  }

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
        id: Number(params.id),
        content: body.content,
      }),
    };
  }
}

export { SectionController };
