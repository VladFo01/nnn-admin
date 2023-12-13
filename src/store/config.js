import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { STORE_NAMES } from '../constants';

import { authorizationReducer } from './authorization/duck';

const reducersObject = {
  [STORE_NAMES.AUTH]: authorizationReducer,
};

const rootReducer = combineReducers(reducersObject);

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
