import { createProject, getUserProjects } from './actions.js';
import { actions } from './projects.slice.js';

const allActions = {
  ...actions,
  createProject,
  getUserProjects,
};

export { allActions as actions };
export { reducer } from './projects.slice.js';
