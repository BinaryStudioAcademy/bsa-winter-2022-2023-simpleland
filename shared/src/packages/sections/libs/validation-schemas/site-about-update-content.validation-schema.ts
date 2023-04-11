import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';
import { type SiteAboutUpdateContentDto } from '~/packages/sections/libs/types/types.js';

const siteAboutUpdateContent = joi.object<SiteAboutUpdateContentDto, true>({
  title: joi
    .string()
    .trim()
    .required()
    .messages({ 'string.empty': SectionValidationMessage.ABOUT_TITLE_REQUIRE }),
  description: joi.string().trim().required().messages({
    'string.empty': SectionValidationMessage.ABOUT_DESCRIPTION_REQUIRE,
  }),
});

export { siteAboutUpdateContent };
