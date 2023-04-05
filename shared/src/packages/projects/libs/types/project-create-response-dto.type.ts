import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectCategory } from '~/packages/projects/libs/enums/enums.js';

type ProjectCreateResponseDto = {
  id: number;
  name: string;
  userId: number;
  category: ValueOf<typeof ProjectCategory>;
};

export { type ProjectCreateResponseDto };
