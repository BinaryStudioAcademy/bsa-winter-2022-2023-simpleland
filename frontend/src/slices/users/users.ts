import { updateUser, updateUserLogin } from './actions.js';
import { actions } from './users.slice.js';

const allActions = {
  ...actions,
  updateUser,
  updateUserLogin,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
