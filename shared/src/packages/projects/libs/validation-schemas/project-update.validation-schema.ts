import joi from 'joi';

import { ProjectCategory } from '~/packages/projects/libs/enums/enums.js';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectCreateRequestDto } from '../types/types.js';

const projectUpdate = joi.object<ProjectCreateRequestDto, true>({
  name: joi.string().trim().optional().messages({
    'string.name': ProjectValidationMessage.NAME_WRONG,
    'string.empty': ProjectValidationMessage.NAME_REQUIRE,
  }),
  category: joi
    .string()
    .trim()
    .optional()
    .valid(...Object.values(ProjectCategory))
    .messages({
      'any.only': ProjectValidationMessage.CATEGORY_WRONG,
      'string.empty': ProjectValidationMessage.CATEGORY_REQUIRE,
    }),
});

export { projectUpdate };
