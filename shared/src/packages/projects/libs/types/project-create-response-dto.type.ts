import { type ValueOf } from '~/libs/types/value-of.type.js';
import { type ProjectType } from '~/packages/projects/libs/enums/enums.js';

type ProjectCreateResponseDto = {
  id: number;
  name: string;
  userId: number;
  type: ValueOf<typeof ProjectType>;
};

export { type ProjectCreateResponseDto };
