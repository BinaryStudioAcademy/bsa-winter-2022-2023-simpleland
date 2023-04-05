import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectCategory } from '~/packages/projects/libs/enums/enums.js';

type ProjectCreateDto = {
  name: string;
  category: ValueOf<typeof ProjectCategory>;
  userId: number;
};

export { type ProjectCreateDto };
