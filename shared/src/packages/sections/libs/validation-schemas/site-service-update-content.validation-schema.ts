import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';
import { type SiteServiceUpdateContentDto } from '~/packages/sections/libs/types/types.js';

const siteServiceUpdateContent = joi.object<SiteServiceUpdateContentDto, true>({
  title: joi.string().required().messages({
    'string.empty': SectionValidationMessage.SERVICE_TITLE_REQUIRE,
  }),
  cards: joi.array().items(
    joi.object({
      title: joi.string().required().messages({
        'string.empty': SectionValidationMessage.SERVICE_CARD_TITLE_REQUIRE,
      }),
      description: joi.string().required().messages({
        'string.empty':
          SectionValidationMessage.SERVICE_CARD_DESCRIPTION_REQUIRE,
      }),
      picture: joi.string().required().messages({
        'string.empty': SectionValidationMessage.SERVICE_CARD_IMAGE_REQUIRE,
      }),
    }),
  ),
});

export { siteServiceUpdateContent };
