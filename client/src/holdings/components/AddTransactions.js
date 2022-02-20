import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { transactionActions } from '../../store/transactionSlice';

// TODO: add condition: buy or sell
const AddTransactions = (props) => {
  const dispatch = useDispatch();
  const showHoldings = useSelector((state) => state.transaction.holdings);

  const [enteredTicker, setEnteredTicker] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredQuantity, setEnteredQuantity] = useState('');
  const [holdings, setHoldings] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const transaction = {
      ticker: enteredTicker.toUpperCase().trim(),
      price: enteredPrice,
      quantity: enteredQuantity,
    };

    console.log(transaction);

    setHoldings(showHoldings);
    console.log(holdings);

    dispatch(transactionActions.addTransaction(transaction));
  };

  return (
    <div>
      <h1>Add Transactions</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="text">Company Ticker: </label>
        <input
          type="text"
          value={enteredTicker}
          placeholder="Ticker"
          onChange={(e) => setEnteredTicker(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          value={enteredPrice}
          placeholder="Price"
          onChange={(e) => setEnteredPrice(e.target.value)}
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          value={enteredQuantity}
          placeholder="Shares/Quantity"
          onChange={(e) => setEnteredQuantity(e.target.value)}
        />

        <button>Add Transactions</button>
      </form>
      <ul>
        {holdings.map((item) => (
          <li>{`${item.ticker} $${item.price} ${item.quantity} shares`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddTransactions;
