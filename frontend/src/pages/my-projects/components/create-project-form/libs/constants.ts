import {
  type ProjectCreateRequestDto,
  ProjectCategory,
} from '~/packages/projects/projects.js';

const DEFAULT_CREATE_PROJECT_PAYLOAD: ProjectCreateRequestDto = {
  name: '',
  category: ProjectCategory.BUSINESS,
};

export { DEFAULT_CREATE_PROJECT_PAYLOAD };
