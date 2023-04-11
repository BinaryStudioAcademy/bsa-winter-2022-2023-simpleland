import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';
import { type SiteMainUpdateContentDto } from '~/packages/sections/libs/types/types.js';

const siteMainUpdateContent = joi.object<SiteMainUpdateContentDto, true>({
  title: joi
    .string()
    .trim()
    .required()
    .messages({ 'string.empty': SectionValidationMessage.MAIN_TITLE_REQUIRE }),
  description: joi.string().trim().required().messages({
    'string.empty': SectionValidationMessage.MAIN_DESCRIPTION_REQUIRE,
  }),
});

export { siteMainUpdateContent };
