import joi from 'joi';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectFilterQueryDto } from '../types/types.js';

const projectFilter = joi.object<ProjectFilterQueryDto, true>({
  name: joi.string().trim().optional().messages({
    'string.empty': ProjectValidationMessage.FILTER_NAME_WRONG,
  }),
});

export { projectFilter };
