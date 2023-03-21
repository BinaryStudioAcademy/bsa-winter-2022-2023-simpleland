import { signUp, updateUser } from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
  updateUser,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
