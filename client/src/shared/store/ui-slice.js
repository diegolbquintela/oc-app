import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { transactionsList: 0 },
  reducers: {
    increment(state) {
      state.transactionsList++;
    },
    decrement(state) {
      state.transactionsList--;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
