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

const { DISHES } = STORE_NAMES;

const initialState = {
  ...INITIAL_STATE,
};

const getActiveMenuThunkName = `${DISHES}/getActiveMenu`;
const getAllDishesThunkName = `${DISHES}/getAllDishes`;
const createMenuThunkName = `${DISHES}/createMenu`;
const setMenuActiveThunkName = `${DISHES}/setMenuActive`;
const deleteMenuThunkName = `${DISHES}/deleteMenu`;

export const getActiveMenu = createCommonAsyncThunk(getActiveMenuThunkName, api.getActiveMenu);
export const getAllDishes = createCommonAsyncThunk(getAllDishesThunkName, api.getAllDishes);
export const createMenu = createCommonAsyncThunk(createMenuThunkName, api.createMenu);
export const setMenuActive = createCommonAsyncThunk(setMenuActiveThunkName, api.setMenuActive);
export const deleteMenu = createCommonAsyncThunk(deleteMenuThunkName, api.deleteMenu);

const dishSlice = createSlice({
  name: DISHES,
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
      .addMatcher(
        isAnyOf(
          getActiveMenu.pending,
          getAllDishes.pending,
          createMenu.pending,
          setMenuActive.pending,
          deleteMenu.pending,
        ),
        state => {
          if (!state.isPending) {
            return {
              ...state,
              ...PENDING_STATE,
            };
          }
        },
      )
      .addMatcher(
        isAnyOf(
          getActiveMenu.rejected,
          getAllDishes.rejected,
          createMenu.rejected,
          setMenuActive.rejected,
          deleteMenu.rejected,
        ),
        (state, action) => {
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
        },
      )
      .addMatcher(
        isAnyOf(
          getActiveMenu.fulfilled,
          getAllDishes.fulfilled,
          createMenu.fulfilled,
          setMenuActive.fulfilled,
          deleteMenu.fulfilled,
        ),
        state => ({
          ...state,
          ...FULFILLED_STATE,
        }),
      );
  },
});

const { actions: dishActions, reducer: dishReducer } = dishSlice;

export { dishActions, dishReducer };
