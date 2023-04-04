import joi from 'joi';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectFilterQueryDto } from '../types/types.js';

const projectFilter = joi.object<ProjectFilterQueryDto, true>({
  name: joi.string().trim().optional().allow('').messages({
    'string.name': ProjectValidationMessage.FILTER_NAME_WRONG,
  }),
});

export { projectFilter };
