import joi from 'joi';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectCreateRequestDto } from '../types/types.js';

const projectCreate = joi.object<ProjectCreateRequestDto, true>({
  name: joi.string().trim().required().messages({
    'string.name': ProjectValidationMessage.NAME_WRONG,
    'string.empty': ProjectValidationMessage.NAME_REQUIRE,
  }),
});

export { projectCreate };
