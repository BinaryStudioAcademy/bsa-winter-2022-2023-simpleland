import { type SelectOption, type ValueOf } from '~/libs/types/types.js';
import {
  type ProjectRequestDto,
  ProjectCategory,
} from '~/packages/projects/projects.js';
import { projectCategoryToReadable } from '~/pages/my-projects/libs/maps/maps.js';

const OPTIONS: SelectOption<ValueOf<typeof ProjectCategory>>[] = Object.values(
  ProjectCategory,
).map((it) => ({
  value: it,
  label: projectCategoryToReadable[it],
}));

const DEFAULT_CREATE_PROJECT_PAYLOAD: ProjectRequestDto = {
  name: '',
  category: ProjectCategory.BUSINESS,
};

export { DEFAULT_CREATE_PROJECT_PAYLOAD, OPTIONS as options };
