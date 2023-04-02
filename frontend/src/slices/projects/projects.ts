import {
  createProject,
  getUserProjects,
  updateProjectImage,
} from './actions.js';
import { actions } from './projects.slice.js';

const allActions = {
  ...actions,
  createProject,
  getUserProjects,
  updateProjectImage,
};

export { allActions as actions };
export { reducer } from './projects.slice.js';
