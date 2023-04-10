import {
  createProject,
  getUserProjects,
  updateProject,
  uploadProjectImage,
} from './actions.js';
import { actions } from './projects.slice.js';

const allActions = {
  ...actions,
  createProject,
  getUserProjects,
  uploadProjectImage,
  updateProject,
};

export { allActions as actions };
export { reducer } from './projects.slice.js';
