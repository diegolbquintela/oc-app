import React, { useRef } from 'react';

// TODO: add condition: buy or sell
const AddTransactions = (props) => {
  const tickerInputRef = useRef();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticker: tickerInputRef.current.value.toUpperCase().trim(),
          price: priceInputRef.current.value,
          quantity: quantityInputRef.current.value,
          user: 'u1',
        }),
      });

      await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Holdings</h1>

      <form onSubmit={submitHandler}>
        <label htmlFor="text">Company Ticker: </label>
        <input ref={tickerInputRef} type="text" placeholder="Ticker" />

        <label htmlFor="price">Price</label>
        <input ref={priceInputRef} type="number" placeholder="Price" />

        <label htmlFor="quantity">Quantity</label>
        <input
          ref={quantityInputRef}
          type="number"
          placeholder="Shares/Quantity"
        />

        <button>Add Transactions</button>
      </form>
    </div>
  );
};

export default AddTransactions;
