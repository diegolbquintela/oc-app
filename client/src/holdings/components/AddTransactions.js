import React, { useRef } from 'react';

import classes from './AddTransactions.module.css';
import Button from '../../shared/components/button/Button';
import Form from '../../shared/components/form/Form';

// TODO: add condition: buy or sell
const AddTransactions = (props) => {
  const tickerInputRef = useRef();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();
  const formRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + '/transactions',
        {
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
        }
      );

      await response.json();
    } catch (err) {
      console.log(err);
    }

    formRef.current.reset();
  };

  return (
    <div>
      {
        <form onSubmit={submitHandler} ref={formRef}>
          <div className={classes.form}>
            <div className={classes.form_fields}>
              <label htmlFor="text">Company Ticker </label>
              <input
                className={classes.form_ticker_input}
                ref={tickerInputRef}
                type="text"
                placeholder="Ticker"
              />
            </div>

            <div className={classes.form_fields}>
              <label htmlFor="price">Price</label>
              <input
                ref={priceInputRef}
                type="number"
                step="0.00000000000000001"
                placeholder="Price"
              />
            </div>

            <div className={classes.form_fields}>
              <label htmlFor="quantity">Quantity</label>
              <input
                ref={quantityInputRef}
                type="number"
                step="0.00000000000000001"
                placeholder="Shares"
              />
            </div>
          </div>

          <div className={classes.btn_center}>
            <Button>Add Transactions</Button>
          </div>
        </form>
      }

      {/* TODO: IMPLEMENT REUSABLE FORM */}
      {/* <Form
        submitHandler={submitHandler}
        formRef={formRef}
        tickerRef={tickerInputRef}
        priceRef={priceInputRef}
        quantityInputRef={quantityInputRef}
        button={`Add Transaction`}
      /> */}
    </div>
  );
};

export default AddTransactions;
