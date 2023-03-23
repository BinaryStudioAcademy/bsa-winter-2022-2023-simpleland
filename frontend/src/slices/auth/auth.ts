import { signIn, signUp } from './actions.js';

const allActions = {
  signUp,
  signIn,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
