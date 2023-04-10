import { getSiteSections, updateContent } from './actions.js';
import { actions } from './sections.slice.js';

const allActions = {
  ...actions,
  getSiteSections,
  updateContent,
};

export { allActions as actions };
export { reducer } from './sections.slice.js';
