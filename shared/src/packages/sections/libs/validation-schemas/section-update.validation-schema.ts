import joi from 'joi';

import { SectionType } from '~/packages/sections/libs/enums/enums.js';
import { type SectionUpdateRequestDto } from '~/packages/sections/libs/types/types.js';

import { siteAboutUpdateContent } from './site-about-update-content.validation-schema.js';
import { siteHeaderUpdateContent } from './site-header-update-content.validation-schema.js';
import { siteMainUpdateContent } from './site-main-update-content.validation-schema.js';

const sectionUpdate = joi.object<SectionUpdateRequestDto>({
  type: joi
    .string()
    .valid(...Object.values(SectionType))
    .required(),
  content: joi.alternatives().conditional('type', {
    switch: [
      {
        is: SectionType.HEADER,
        then: siteHeaderUpdateContent,
      },
      {
        is: SectionType.ABOUT,
        then: siteAboutUpdateContent,
      },
      {
        is: SectionType.MAIN,
        then: siteMainUpdateContent,
      },
    ],
    otherwise: joi.forbidden(),
  }),
});

export { sectionUpdate };
