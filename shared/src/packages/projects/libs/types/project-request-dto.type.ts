import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectCategory } from '~/packages/projects/libs/enums/enums.js';

type ProjectRequestDto = {
  name: string;
  category: ValueOf<typeof ProjectCategory>;
};

export { type ProjectRequestDto };
