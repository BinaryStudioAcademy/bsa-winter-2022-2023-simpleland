import joi from 'joi';

import {
  SiteNameValidationMessage,
  SiteNameValidationRule,
} from '../enums/enums.js';
import { type SiteNameDto } from '../types/types.js';

const siteNameValidationSchema = joi.object<SiteNameDto, true>({
  siteName: joi
    .string()
    .required()
    .pattern(SiteNameValidationRule.SITE_NAME_REGEX)
    .messages({
      'string.name': SiteNameValidationMessage.SITE_NAME_WRONG,
      'string.empty': SiteNameValidationMessage.SITE_NAME_REQUIRE,
      'string.pattern.base': SiteNameValidationMessage.SITE_NAME_PATTERN,
    }),
});

export { siteNameValidationSchema };
