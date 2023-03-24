import { getCurrentUser, logout, signIn, signUp } from './actions.js';

const allActions = {
  signUp,
  signIn,
  getCurrentUser,
  logout
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
