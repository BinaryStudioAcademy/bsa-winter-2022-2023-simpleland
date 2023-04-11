import { createSite, getCurrentSite, getSitesByProjectId } from './actions.js';
import { actions } from './sites.slice.js';

const allActions = {
  ...actions,
  createSite,
  getSitesByProjectId,
  getCurrentSite,
};

export { allActions as actions };
export { reducer } from './sites.slice.js';
