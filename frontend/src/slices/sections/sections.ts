import { getSiteSections } from './actions.js';
import { actions } from './sections.slice.js';

const allActions = {
  ...actions,
  getSiteSections,
};

export { allActions as actions };
export { reducer } from './sections.slice.js';
