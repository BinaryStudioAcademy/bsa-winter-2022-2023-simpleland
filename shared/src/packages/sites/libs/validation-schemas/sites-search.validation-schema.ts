import joi from 'joi';

import { SiteValidationMessage } from '~/packages/sites/libs/enums/enums.js';
import { type SitesSearchDto } from '~/packages/sites/libs/types/types.js';

const sitesSearch = joi.object<SitesSearchDto, true>({
  name: joi.string().trim().optional().allow('').messages({
    'string.name': SiteValidationMessage.FILTER_NAME_WRONG,
  }),
});

export { sitesSearch };
