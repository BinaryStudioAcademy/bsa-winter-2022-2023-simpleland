import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';
import { type SitePortfolioUpdateContentDto } from '~/packages/sections/libs/types/types.js';

const sitePortfolioUpdateContent = joi.object<
  SitePortfolioUpdateContentDto,
  true
>({
  title: joi.string().trim().required().messages({
    'string.empty': SectionValidationMessage.PORTFOLIO_TITLE_REQUIRE,
  }),
});

export { sitePortfolioUpdateContent };
