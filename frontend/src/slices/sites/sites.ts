import { getSitesByProjectId } from './actions.js';
import { actions } from './sites.slice.js';

const allActions = {
  ...actions,
  getSitesByProjectId,
};

export { allActions as actions };
export { reducer } from './sites.slice.js';
