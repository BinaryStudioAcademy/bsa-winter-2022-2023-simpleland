import joi from 'joi';

import { ProjectType } from '~/packages/projects/libs/enums/enums.js';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectCreateRequestDto } from '../types/types.js';

const projectCreate = joi.object<ProjectCreateRequestDto, true>({
  name: joi.string().trim().required().messages({
    'string.name': ProjectValidationMessage.NAME_WRONG,
    'string.empty': ProjectValidationMessage.NAME_REQUIRE,
  }),
  type: joi
    .string()
    .required()
    .valid(...Object.values(ProjectType))
    .messages({
      'string.type': ProjectValidationMessage.TYPE_WRONG,
      'string.required': ProjectValidationMessage.TYPE_REQUIRE,
    }),
});

export { projectCreate };
