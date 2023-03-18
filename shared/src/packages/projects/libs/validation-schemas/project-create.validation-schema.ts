import joi from 'joi';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectCreateRequestDto } from '../types/types.js';

const projectCreate = joi.object<ProjectCreateRequestDto, true>({
  name: joi.string().trim().required().messages({
    'string.name': ProjectValidationMessage.NAME_WRONG,
    'string.empty': ProjectValidationMessage.NAME_REQUIRE,
  }),
  userId: joi.number().positive().integer().min(1).required().messages({
    'number.userId': ProjectValidationMessage.USER_ID_WRONG,
    'number.empty': ProjectValidationMessage.USER_ID_REQUIRE,
  }),
});

export { projectCreate };
