import joi from 'joi';

import { SiteValidationMessage } from '../enums/enums.js';
import { type SitesFilterQueryDto } from '../types/types.js';

const siteFilter = joi.object<SitesFilterQueryDto, true>({
  name: joi.string().trim().optional().allow('').messages({
    'string.name': SiteValidationMessage.FILTER_NAME_WRONG,
  }),
});

export { siteFilter };
