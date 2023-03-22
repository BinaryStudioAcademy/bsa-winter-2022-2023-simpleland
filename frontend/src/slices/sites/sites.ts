import { getSites } from './actions.js';
import { actions } from './sites.slice.js';

const allActions = {
  ...actions,
  getSites,
};

export { allActions as actions };
export { reducer } from './sites.slice.js';
