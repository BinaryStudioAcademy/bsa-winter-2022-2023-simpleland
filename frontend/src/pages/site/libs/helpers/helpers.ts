import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionGetAllItemResponseDto,
  type SectionType,
} from '~/packages/sections/sections.js';

function sortSectionsByPosition(
  sections: SectionGetAllItemResponseDto[],
  sectionTypeToPosition: Record<ValueOf<typeof SectionType>, number>,
): SectionGetAllItemResponseDto[] {
  return [...sections].sort((a, b) => {
    return sectionTypeToPosition[a.type] - sectionTypeToPosition[b.type];
  });
}

export { sortSectionsByPosition };
