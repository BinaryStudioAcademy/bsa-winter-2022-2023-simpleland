import { type SectionName } from './section-name.type.js';

type SectionGetAllItemResponseDto<T = unknown> = {
  id: number;
  name: SectionName;
  content: T;
};

export { type SectionGetAllItemResponseDto };
