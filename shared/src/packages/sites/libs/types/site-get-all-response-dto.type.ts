import { type SiteGetAllItemResponseDto } from './site-get-all-item-response-dto.type.js';

type SiteGetAllResponseDto = {
  items: SiteGetAllItemResponseDto[];
  totalCount: number;
};

export { type SiteGetAllResponseDto };
