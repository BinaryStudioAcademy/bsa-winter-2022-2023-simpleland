import { ApiPath } from '~/libs/enums/enums.js';
import { SectionsApiPath } from '~/packages/sections/sections.js';

const SECTION_EDITING_ROUTE = {
  routerPath: `/api/v1${ApiPath.SECTIONS}${SectionsApiPath.$ID}`,
  method: 'PUT',
} as const;

export { SECTION_EDITING_ROUTE };
