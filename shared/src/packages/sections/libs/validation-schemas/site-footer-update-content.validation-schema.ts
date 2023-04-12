import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';

import { type SiteFooterUpdateContentDto } from '../types/types.js';

const siteFooterUpdateContent = joi.object<SiteFooterUpdateContentDto, true>({
  contacts: joi.object({
    email: joi.string().required().messages({
      'string.empty': SectionValidationMessage.FOOTER_CONTACTS_EMAIL_REQUIRE,
    }),
    address: joi.string().required().messages({
      'string.empty': SectionValidationMessage.FOOTER_CONTACTS_ADDRESS_REQUIRE,
    }),
    phone: joi.string().required().messages({
      'string.empty': SectionValidationMessage.FOOTER_CONTACTS_PHONE_REQUIRE,
    }),
  }),
});

export { siteFooterUpdateContent };
