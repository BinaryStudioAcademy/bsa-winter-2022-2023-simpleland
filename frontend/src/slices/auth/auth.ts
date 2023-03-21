import { signUp, updateUserDetails } from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  updateUserDetails,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
