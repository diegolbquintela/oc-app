import { createSlice } from '@reduxjs/toolkit';

const initialTransactionState = {
  updateHoldings: [],
  ticker: '',
  price: 0,
  quantity: 0,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialTransactionState,
  reducers: {
    addTransaction(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.ticker === newItem.ticker
      );

      if (!existingItem) {
        state.items.push({
          itemId: newItem.ticker,
          ticker: newItem.ticker,
          price: newItem.price,
          quantity: newItem.quantity,
        });
      } else {
        existingItem.quantity++;
        existingItem.item.price =
          (newItem.price * newItem.quantity +
            existingItem.price * existingItem.quantity) /
          (existingItem.quantity + newItem.quantity);
      }
    },
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice;
