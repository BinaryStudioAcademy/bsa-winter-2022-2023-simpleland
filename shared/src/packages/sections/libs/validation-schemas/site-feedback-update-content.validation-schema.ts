import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';
import { type SitePortfolioUpdateContentDto } from '~/packages/sections/libs/types/types.js';

const siteFeedbackUpdateContent = joi.object<
  SitePortfolioUpdateContentDto,
  true
>({
  title: joi.string().required().messages({
    'string.empty': SectionValidationMessage.HEADER_LOGO_REQUIRE,
  }),
});

export { siteFeedbackUpdateContent };
