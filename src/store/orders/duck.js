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

const { ORDERS } = STORE_NAMES;

const initialState = {
  ...INITIAL_STATE,
};

const confirmOrderThunkName = `${ORDERS}/confirm`;

export const confirmOrder = createCommonAsyncThunk(confirmOrderThunkName, api.confirmOrder);

const orderSlice = createSlice({
  name: ORDERS,
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
      .addMatcher(isAnyOf(confirmOrder.pending), state => {
        if (!state.isPending) {
          return {
            ...state,
            ...PENDING_STATE,
          };
        }
      })
      .addMatcher(isAnyOf(confirmOrder.rejected), (state, action) => {
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
      .addMatcher(isAnyOf(confirmOrder.fulfilled), state => ({
        ...state,
        ...FULFILLED_STATE,
      }));
  },
});

const { actions: orderActions, reducer: orderReducer } = orderSlice;

export { orderActions, orderReducer };
