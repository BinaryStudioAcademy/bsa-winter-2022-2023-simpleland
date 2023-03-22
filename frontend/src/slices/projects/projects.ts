import { getProjects } from './actions.js';
import { actions } from './projects.slice.js';

const allActions = {
  ...actions,
  getProjects,
};

export { allActions as actions };
export { reducer } from './projects.slice.js';
