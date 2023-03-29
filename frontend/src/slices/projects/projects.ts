import { getUserProjects } from './actions.js';
import { actions } from './projects.slice.js';

const allActions = {
  ...actions,
  getUserProjects,
};

export { allActions as actions };
export { reducer } from './projects.slice.js';
