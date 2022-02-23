import { createSlice } from '@reduxjs/toolkit';

const initialTransactionState = {
  holdings: [],
  ticker: '',
  price: 0,
  quantity: 0,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialTransactionState,
  reducers: {
    addTransaction(state, action) {
      const newHolding = action.payload;
      const existingHolding = state.holdings.find(
        (holding) => holding.ticker === newHolding.ticker
      );

      if (!existingHolding) {
        state.holdings.push({
          holdingId: newHolding.ticker,
          ticker: newHolding.ticker,
          price: newHolding.price,
          quantity: newHolding.quantity,
        });
      } else {
        // TODO: just a fix, q and p should be stored in DB
        let initialTransactionAmount =
          existingHolding.price * existingHolding.quantity;

        existingHolding.quantity =
          Number(existingHolding.quantity) + Number(newHolding.quantity);

        let newTransactionAmount =
          Number(newHolding.price) * Number(newHolding.quantity);

        let totalAmount = newTransactionAmount + initialTransactionAmount;

        existingHolding.price = (
          totalAmount / existingHolding.quantity
        ).toFixed(2);
      }
    },
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice;
