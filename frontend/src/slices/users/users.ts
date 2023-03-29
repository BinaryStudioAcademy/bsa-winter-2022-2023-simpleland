import { updatePassword, updateUser } from './actions.js';
import { actions } from './users.slice.js';

const allActions = {
  ...actions,
  updateUser,
  updatePassword,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
