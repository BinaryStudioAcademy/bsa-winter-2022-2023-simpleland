import joi from 'joi';

import { type SiteCreateRequestDto } from '~/packages/sites/libs/types/types.js';

const siteCreate = joi.object<SiteCreateRequestDto, true>({
  name: joi.string().required(),
  industry: joi.string().required(),
});

export { siteCreate };
