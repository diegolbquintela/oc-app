import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from './AddTransactions.module.css';
import Button from '../../shared/components/UIElements/Button/Button';
import useForm from '../../shared/hooks/form/Form';
import { uiActions } from '../../shared/store/ui-slice';

// TODO: add condition: buy or sell
const AddTransactions = () => {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();

  const tickerInputHandler = (e) => {
    setTicker(e.target.value);
  };
  const priceInputHandler = (e) => {
    setPrice(e.target.value);
  };
  const quantityInputHandler = (e) => {
    setQuantity(e.target.value);
  };

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
            ticker: ticker.toUpperCase().trim(),
            price,
            quantity,
            user: 'u1',
          }),
        }
      );

      await response.json();
      dispatch(uiActions.increment());

      setTicker('');
      setPrice('');
      setQuantity('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {
        <form onSubmit={submitHandler}>
          <div className={classes.form}>
            <div className={classes.form_fields}>
              <label htmlFor="text">Company Ticker </label>
              <input
                className={classes.form_ticker_input}
                type="text"
                placeholder="Ticker"
                onChange={tickerInputHandler}
                value={ticker}
              />
            </div>

            <div className={classes.form_fields}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                step="0.00000000000000001"
                placeholder="Price"
                onChange={priceInputHandler}
                value={price}
              />
            </div>

            <div className={classes.form_fields}>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                step="0.00000000000000001"
                placeholder="Shares"
                onChange={quantityInputHandler}
                value={quantity}
              />
            </div>
          </div>

          <div className={classes.btn_center}>
            <Button>Add Transactions</Button>
          </div>
        </form>
      }

      {/* TODO: IMPLEMENT REUSABLE FORM */}
    </div>
  );
};

export default AddTransactions;
