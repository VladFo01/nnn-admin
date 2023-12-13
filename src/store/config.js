import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducersObject = {

};

const rootReducer = combineReducers(reducersObject);

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

