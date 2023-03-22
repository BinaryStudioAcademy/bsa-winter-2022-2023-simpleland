import { notify } from './actions.js';
import { actions } from './app.slice.js';

const allActions = {
  ...actions,
  notify,
};

export { allActions as actions };
export { reducer } from './app.slice.js';
