import joi from 'joi';

import { SectionType } from '~/packages/sections/libs/enums/enums.js';
import { type SectionUpdateRequestDto } from '~/packages/sections/libs/types/types.js';

import { siteHeaderUpdateContent } from './site-header-update-content.validation-schema.js';

const sectionUpdate = joi.object<SectionUpdateRequestDto>({
  type: joi
    .string()
    .valid(...Object.values(SectionType))
    .required(),
  content: joi.when('type', {
    is: SectionType.HEADER,
    then: siteHeaderUpdateContent,
    otherwise: joi.forbidden(),
  }),
});

export { sectionUpdate };
