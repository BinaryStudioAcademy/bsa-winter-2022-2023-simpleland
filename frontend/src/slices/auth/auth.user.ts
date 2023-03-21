import { getAuthUser } from './actions.js';
import { actions } from './auth.slice.js';

const authUserActions = {
  ...actions,
  getAuthUser,
};

export { authUserActions as actions };
export { reducer } from './auth.slice.js';
