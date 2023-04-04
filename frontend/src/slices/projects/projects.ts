import {
  createProject,
  getUserProjects,
  uploadProjectImage,
} from './actions.js';
import { actions } from './projects.slice.js';

const allActions = {
  ...actions,
  createProject,
  getUserProjects,
  uploadProjectImage,
};

export { allActions as actions };
export { reducer } from './projects.slice.js';
