import joi from 'joi';

import { ProjectCategory } from '~/packages/projects/libs/enums/enums.js';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectRequestDto } from '../types/types.js';

const projectCreate = joi.object<ProjectRequestDto, true>({
  name: joi.string().trim().required().messages({
    'string.name': ProjectValidationMessage.NAME_WRONG,
    'string.empty': ProjectValidationMessage.NAME_REQUIRE,
  }),
  category: joi
    .string()
    .trim()
    .required()
    .valid(...Object.values(ProjectCategory))
    .messages({
      'any.only': ProjectValidationMessage.CATEGORY_WRONG,
      'string.empty': ProjectValidationMessage.CATEGORY_REQUIRE,
    }),
});

export { projectCreate };
