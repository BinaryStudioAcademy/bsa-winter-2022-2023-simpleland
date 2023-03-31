import { updateUser, updateUserAvatar } from './actions.js';
import { actions } from './users.slice.js';

const allActions = {
  ...actions,
  updateUser,
  updateUserAvatar,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
