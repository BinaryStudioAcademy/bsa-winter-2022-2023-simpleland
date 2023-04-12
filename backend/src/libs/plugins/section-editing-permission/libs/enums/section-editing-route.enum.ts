import { ApiPath } from '~/libs/enums/enums.js';
import { SectionsApiPath } from '~/packages/sections/sections.js';

const SectionEditingRoute = {
  PATH: `/api/v1${ApiPath.SECTIONS}${SectionsApiPath.$ID}`,
  METHOD: 'PUT',
};

export { SectionEditingRoute };
