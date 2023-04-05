import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectCategory } from '~/packages/projects/libs/enums/enums.js';

type ProjectGetAllItemResponseDto = {
  id: number;
  name: string;
  userId: number;
  avatarUrl: string | null;
  category: ValueOf<typeof ProjectCategory>;
};

export { type ProjectGetAllItemResponseDto };
