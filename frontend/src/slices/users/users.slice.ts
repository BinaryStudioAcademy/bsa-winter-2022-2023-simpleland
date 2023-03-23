import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserGetAllItemResponseDto } from '~/packages/users/users.js';

type State = {
  users: UserGetAllItemResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  users: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'users',
  reducers: {},
});

export { actions, name, reducer };
