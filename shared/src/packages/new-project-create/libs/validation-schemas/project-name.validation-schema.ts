import joi from 'joi';

import { ProjectNameValidationMessage } from '../enums/enums.js';

const ProjectNameValidationSchema = joi.object({
  projectName: joi
    .string()
    .min(1)
    .max(30)
    .regex(/^[\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}~-]+$/)
    .messages({
      'string.name': ProjectNameValidationMessage.PROJECT_NAME_WRONG,
      'string.empty': ProjectNameValidationMessage.PROJECT_NAME_REQUIRE,
      'string.min': ProjectNameValidationMessage.PROJECT_NAME_MIN,
      'string.max': ProjectNameValidationMessage.PROJECT_NAME_MAX,
      'string.pattern.base':
        ProjectNameValidationMessage.PROJECT_NAME_PATTERN,
    }),
});

export { ProjectNameValidationSchema };
