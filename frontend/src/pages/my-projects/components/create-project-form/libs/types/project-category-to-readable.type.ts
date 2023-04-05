import { ProjectCategory } from '~/packages/projects/projects.js';

const projectCategoryToReadable = {
  [ProjectCategory.ECOMMERICAL]: 'eCommercial',
  [ProjectCategory.BUSINESS]: 'Business',
  [ProjectCategory.BLOG]: 'Blog',
  [ProjectCategory.PORTFOLIO]: 'Portfolio',
  [ProjectCategory.PERSONAL]: 'Personal',
  [ProjectCategory.NONPROFIT]: 'Nonprofit',
};

export { projectCategoryToReadable };
