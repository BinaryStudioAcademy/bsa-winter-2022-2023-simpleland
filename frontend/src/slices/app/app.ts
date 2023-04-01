import { navigate, notify } from './actions.js';
import { actions } from './app.slice.js';

const allActions = {
  ...actions,
  navigate,
  notify,
};

export { allActions as actions };
export { reducer } from './app.slice.js';
