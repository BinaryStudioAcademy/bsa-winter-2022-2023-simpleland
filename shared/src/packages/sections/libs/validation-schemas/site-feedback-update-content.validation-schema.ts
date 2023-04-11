import joi from 'joi';

import { SectionValidationMessage } from '~/packages/sections/libs/enums/enums.js';

import { type SiteFeedbackUpdateContentDto } from '../types/types.js';

const siteFeedbackUpdateContent = joi.object<
  SiteFeedbackUpdateContentDto,
  true
>({
  title: joi.string().required().messages({
    'string.empty': SectionValidationMessage.HEADER_LOGO_REQUIRE,
  }),
  cards: joi.array().items(
    joi.object({
      name: joi.string().required().messages({
        'string.empty': SectionValidationMessage.HEADER_LOGO_REQUIRE,
      }),
      profession: joi.string().required().messages({
        'string.empty': SectionValidationMessage.FEEDBACK_PROFESSION_REQUIRE,
      }),
      feedback: joi.string().required().messages({
        'string.empty': SectionValidationMessage.FEEDBACK_REQUIRE,
      }),
      photo: joi.string().required().messages({
        'string.empty': SectionValidationMessage.FEEDBACK_PHOTO_REQUIRE,
      }),
    }),
  ),
});

export { siteFeedbackUpdateContent };
