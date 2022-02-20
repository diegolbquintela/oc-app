import React, { useState } from 'react';

// TODO: add condition: buy or sell
const AddTransactions = (props) => {
  const [enteredTicker, setEnteredTicker] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredQuantity, setEnteredQuantity] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const transaction = {
      ticker: enteredTicker.toUpperCase().trim(),
      price: enteredPrice,
      quantity: enteredQuantity,
    };

    console.log(transaction);
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
    </div>
  );
};

export default AddTransactions;
