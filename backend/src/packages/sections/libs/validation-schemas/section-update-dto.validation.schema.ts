/* eslint-disable unicorn/no-thenable */
import joi from 'joi';
import { siteHeaderUpdateContentValidationSchema } from 'shared/build/index.js';

import { SectionType } from '~/packages/sections/libs/enums/enums.js';
import { type SectionUpdateRequestDto } from '~/packages/sections/libs/types/types.js';

const sectionUpdate = joi.object<SectionUpdateRequestDto>({
  type: joi
    .string()
    .valid(...Object.values(SectionType))
    .required(),
  content: joi.when('type', {
    is: SectionType.HEADER,
    then: siteHeaderUpdateContentValidationSchema,
    otherwise: joi.forbidden(),
  }),
});

export { sectionUpdate };
