import { type ValueOf } from '~/libs/types/value-of.type.js';
import { type ProjectType } from '~/packages/projects/libs/enums/enums.js';

type ProjectGetAllItemResponseDto = {
  id: number;
  name: string;
  userId: number;
  avatarUrl: string | null;
  type: ValueOf<typeof ProjectType>;
};

export { type ProjectGetAllItemResponseDto };
