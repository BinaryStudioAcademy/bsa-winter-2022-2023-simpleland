import { getSitesByProject } from './actions.js';
import { actions } from './sites.slice.js';

const allActions = {
  ...actions,
  getSitesByProject,
};

export { allActions as actions };
export { reducer } from './sites.slice.js';
