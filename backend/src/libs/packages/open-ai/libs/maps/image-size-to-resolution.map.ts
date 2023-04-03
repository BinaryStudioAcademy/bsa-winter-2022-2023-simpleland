import { CreateImageRequestSizeEnum } from 'openai';

import { ImageSize } from '~/libs/packages/open-ai/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const imageSizeToResolutionMap: Record<
  ValueOf<typeof ImageSize>,
  ValueOf<typeof CreateImageRequestSizeEnum>
> = {
  [ImageSize.SMALL]: CreateImageRequestSizeEnum._256x256,
  [ImageSize.MEDIUM]: CreateImageRequestSizeEnum._512x512,
  [ImageSize.LARGE]: CreateImageRequestSizeEnum._1024x1024,
};

export { imageSizeToResolutionMap };
