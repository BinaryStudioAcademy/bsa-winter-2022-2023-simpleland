import { type SelectOption } from '~/libs/types/types.js';
import {
  type ProjectCreateRequestDto,
  ProjectCategory,
} from '~/packages/projects/projects.js';

import { projectCategoryToReadable } from './types/types.js';

const OPTIONS: SelectOption<string | number>[] = Object.values(
  ProjectCategory,
).map((it) => ({
  value: it,
  label: projectCategoryToReadable[it],
}));

const DEFAULT_CREATE_PROJECT_PAYLOAD: ProjectCreateRequestDto = {
  name: '',
  category: ProjectCategory.BUSINESS,
};

export { DEFAULT_CREATE_PROJECT_PAYLOAD, OPTIONS as options };
