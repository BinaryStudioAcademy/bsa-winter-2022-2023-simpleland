import { type SelectOption } from '~/libs/types/types.js';
import {
  type ProjectCreateRequestDto,
  ProjectCategory,
} from '~/packages/projects/projects.js';

const projectCategoryToReadable = {
  [ProjectCategory.ECOMMERICAL]: 'eCommercial',
  [ProjectCategory.BUSINESS]: 'Business',
  [ProjectCategory.BLOG]: 'Blog',
  [ProjectCategory.PORTFOLIO]: 'Portfolio',
  [ProjectCategory.PERSONAL]: 'Personal',
  [ProjectCategory.NONPROFIT]: 'Nonprofit',
};

const options: SelectOption<string | number>[] = Object.values(
  ProjectCategory,
).map((it) => ({
  value: it,
  label: projectCategoryToReadable[it],
}));

const DEFAULT_CREATE_PROJECT_PAYLOAD: ProjectCreateRequestDto = {
  name: '',
  category: ProjectCategory.BUSINESS,
};

export { DEFAULT_CREATE_PROJECT_PAYLOAD, options };
