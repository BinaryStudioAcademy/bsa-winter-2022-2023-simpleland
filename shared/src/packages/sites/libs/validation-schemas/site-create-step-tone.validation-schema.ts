import joi from 'joi';

import { type SiteCreateStepTone } from '~/packages/sites/libs/types/types.js';

import { SiteValidationMessage } from '../enums/enums.js';

const siteCreateStepTone = joi.object<SiteCreateStepTone>({
  tone: joi.string().valid('official', 'notOfficial').required().messages({
    'string.empty': SiteValidationMessage.SITE_TONE_REQUIRE,
    'string.pattern.base': SiteValidationMessage.SITE_TONE_PATTERN,
  }),
});

export { siteCreateStepTone };
