import {
  createProject,
  getCurrentProject,
  getUserProjects,
  updateProject,
  uploadProjectImage,
} from './actions.js';
import { actions } from './projects.slice.js';

const allActions = {
  ...actions,
  createProject,
  getCurrentProject,
  getUserProjects,
  uploadProjectImage,
  updateProject,
};

export { allActions as actions };
export { reducer } from './projects.slice.js';
