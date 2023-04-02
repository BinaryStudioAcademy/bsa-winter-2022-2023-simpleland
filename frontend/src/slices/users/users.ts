import {
  updateUser,
  updateUserAvatar,
  updateUserLogin,
  updateUserPassword,
} from './actions.js';
import { actions } from './users.slice.js';

const allActions = {
  ...actions,
  updateUser,
  updateUserPassword,
  updateUserLogin,
  updateUserAvatar,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
