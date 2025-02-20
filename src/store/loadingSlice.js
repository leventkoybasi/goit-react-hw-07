import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: () => true,
    hideLoading: () => false,
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
