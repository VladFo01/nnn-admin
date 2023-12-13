import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { STORE_NAMES } from '../constants';

import { authorizationReducer } from './authorization/duck';
import { feedbackReducer } from './feedback/duck';
import { orderReducer } from './orders/duck';
import { dishReducer } from './dishes/duck';

const reducersObject = {
  [STORE_NAMES.AUTH]: authorizationReducer,
  [STORE_NAMES.FEEDBACK]: feedbackReducer,
  [STORE_NAMES.ORDERS]: orderReducer,
  [STORE_NAMES.DISHES]: dishReducer,
};

const rootReducer = combineReducers(reducersObject);

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
