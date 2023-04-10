import { type ProjectGetAllItemResponseDto } from './project-get-all-item-response-dto.type.js';

type ProjectGetAllResponseDto = {
  totalCount: number;
  items: ProjectGetAllItemResponseDto[];
};

export { type ProjectGetAllResponseDto };
