import { type ValueOf } from '~/libs/types/value-of.type.js';
import { type ProjectType } from '~/packages/projects/libs/enums/enums.js';

type ProjectCreateDto = {
  name: string;
  type: ValueOf<typeof ProjectType>;
  userId: number;
};

export { type ProjectCreateDto };
