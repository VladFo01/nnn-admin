import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES,
} from '../../constants';

import { createCommonAsyncThunk } from '../../utils/helpers';
import api from './api';
import storage from '../../utils/storage';

const { AUTH } = STORE_NAMES;

const initialState = {
  ...INITIAL_STATE,
  worker_info: JSON.parse(storage.getWorkerInfo() || '{}'),
};

const loginThunkName = `${AUTH}/login`;

export const login = createCommonAsyncThunk(loginThunkName, api.login);

const authorizationSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    resetState: () => initialState,
    resetError: state => ({
      ...state,
      error: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(login.pending), state => {
        if (!state.isPending) {
          return {
            ...state,
            ...PENDING_STATE,
          };
        }
      })
      .addMatcher(isAnyOf(login.rejected), (state, action) => {
        const {
          data: { message, errors },
          status,
        } = action.payload;

        if (state.isPending) {
          const newState = {
            ...state,
            ...REJECTED_STATE,
            error: { message, status, errors },
          };

          return newState;
        }
      })
      .addMatcher(isAnyOf(login.fulfilled), (state, action) => {
        storage.setWorkerInfo(action.payload.worker);
        return {
            ...state,
            ...FULFILLED_STATE,
            worker_info: action.payload.worker,
          }
      });
  },
});

const { actions: authActions, reducer: authorizationReducer } = authorizationSlice;

export { authActions, authorizationReducer };
