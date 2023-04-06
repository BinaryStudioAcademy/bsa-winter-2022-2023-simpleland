import { type SelectOption, type ValueOf } from '~/libs/types/types.js';
import { ProjectCategory } from '~/packages/projects/projects.js';
import { projectCategoryToReadable } from '~/pages/my-projects/libs/maps/maps.js';

const OPTIONS: SelectOption<ValueOf<typeof ProjectCategory>>[] = Object.values(
  ProjectCategory,
).map((it) => ({
  value: it,
  label: projectCategoryToReadable[it],
}));

export { OPTIONS as options };
