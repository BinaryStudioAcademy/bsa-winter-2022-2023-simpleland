import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';
import { type SiteHeaderUpdateContentDto } from '~/packages/sections/libs/types/types.js';

const siteHeaderUpdateContent = joi.object<SiteHeaderUpdateContentDto, true>({
  logo: joi
    .string()
    .trim()
    .required()
    .messages({ 'string.empty': SectionValidationMessage.HEADER_LOGO_REQUIRE }),
  phone: joi
    .string()
    .trim()
    .required()
    .messages({
      'string.empty': SectionValidationMessage.HEADER_PHONE_REQUIRE,
    }),
});

export { siteHeaderUpdateContent };
