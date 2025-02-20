import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice.js';
import errorReducer from './errorSlice.js';
import loadingReducer from './loadingSlice.js';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    error: errorReducer,
    loading: loadingReducer,
  },
});
