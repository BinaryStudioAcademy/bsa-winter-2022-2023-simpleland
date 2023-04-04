import { type ValueOf } from '~/libs/types/value-of.type.js';
import { type ProjectType } from '~/packages/projects/libs/enums/enums.js';

type ProjectCreateRequestDto = {
  name: string;
  type: ValueOf<typeof ProjectType>;
};

export { type ProjectCreateRequestDto };
