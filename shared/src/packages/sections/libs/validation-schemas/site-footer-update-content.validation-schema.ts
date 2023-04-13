import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';

import { type SiteFooterUpdateContentDto } from '../types/types.js';

const siteFooterUpdateContent = joi.object<SiteFooterUpdateContentDto, true>({
  logo: joi.string().required().messages({
    'string.empty': SectionValidationMessage.FOOTER_LOGO_REQUIRE,
  }),
  description: joi.string().required().messages({
    'string.empty': SectionValidationMessage.FOOTER_DESCRIPTION_REQUIRE,
  }),
  email: joi.string().required().messages({
    'string.empty': SectionValidationMessage.FOOTER_EMAIL_REQUIRE,
  }),
  address: joi.string().required().messages({
    'string.empty': SectionValidationMessage.FOOTER_ADDRESS_REQUIRE,
  }),
  phone: joi.string().required().messages({
    'string.empty': SectionValidationMessage.FOOTER_PHONE_REQUIRE,
  }),
});

export { siteFooterUpdateContent };
