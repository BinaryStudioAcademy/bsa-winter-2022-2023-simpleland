import joi from 'joi';

import { type StepTargetDto } from '../types/types.js';

const stepTarget =joi.object<StepTargetDto, true>({
  targetSelect: joi.object({
    label: joi.string(),
    value: joi.string().trim().required().messages({
      'string.empty': 'Your message',
    })
  })
});

export { stepTarget };