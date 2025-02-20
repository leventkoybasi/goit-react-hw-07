/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state) => {
      return true;
    },
    hideError: (state) => {
      return false;
    },
  },
});

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;
