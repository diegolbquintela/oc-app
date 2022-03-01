import React, { useRef } from 'react';

import classes from './AddTransactions.module.css';

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
      <form onSubmit={submitHandler}>
        <div className={classes.form}>
          <div>
            <label htmlFor="text">Company Ticker </label>
            <input ref={tickerInputRef} type="text" placeholder="Ticker" />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input ref={priceInputRef} type="number" placeholder="Price" />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input ref={quantityInputRef} type="number" placeholder="Shares" />
          </div>
        </div>

        <div className={classes.btn_center}>
          <button className={classes.btn}>Add Transactions</button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactions;
