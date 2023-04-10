import joi from 'joi';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectFilterQueryDto } from '../types/types.js';

const projectFilter = joi.object<ProjectFilterQueryDto, true>({
  name: joi.string().trim().optional().allow('').messages({
    'string.name': ProjectValidationMessage.FILTER_NAME_WRONG,
  }),
  page: joi.number().required().messages({
    'number.page': ProjectValidationMessage.FILTER_PAGE_WRONG,
  }),
  limit: joi.number().required().messages({
    'number.limit': ProjectValidationMessage.FILTER_LIMIT_WRONG,
  }),
});

export { projectFilter };
