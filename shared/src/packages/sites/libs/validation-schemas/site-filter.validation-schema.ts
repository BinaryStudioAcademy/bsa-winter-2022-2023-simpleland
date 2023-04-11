import joi, { type StringSchema } from 'joi';

import { SiteValidationMessage } from '~/packages/sites/libs/enums/enums.js';
import { type SitesFilterQueryDto } from '~/packages/sites/libs/types/types.js';

import { sitesSearch } from './sites-search.validation-schema.js';

const siteFilter = joi.object<SitesFilterQueryDto, true>({
  name: sitesSearch.extract('name') as StringSchema,
  page: joi.number().required().messages({
    'number.page': SiteValidationMessage.FILTER_PAGE_WRONG,
  }),
  limit: joi.number().required().messages({
    'number.limit': SiteValidationMessage.FILTER_LIMIT_WRONG,
  }),
});

export { siteFilter };
