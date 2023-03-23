import { getCurrentUser, signIn, signUp } from './actions.js';

const allActions = {
  signUp,
  signIn,
  getCurrentUser,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
