import joi from 'joi';

import { SiteValidationMessage } from '../enums/enums.js';
import { type SiteCreateStepTarget } from '../types/types.js';

const siteCreateStepTarget = joi.object<SiteCreateStepTarget, true>({
  targetAudience: joi
    .array()
    .items(
      joi.object({
        label: joi.string().required(),
        value: joi.string().required(),
      })
    )
    .min(1)
    .messages({ 'array.min': SiteValidationMessage.SITE_TARGET_REQUIRE }),
});

export { siteCreateStepTarget };
