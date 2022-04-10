import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../shared/store/ui-slice';
import { useHttp } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import classes from './AddTransactions.module.css';
import Button from '../../shared/components/UIElements/Button/Button';

// TODO: add condition: buy or sell
const AddTransactions = () => {
  const auth = useContext(AuthContext);
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error, errorMessage, sendRequest, clearError } = useHttp();

  //user id
  const userId = auth.userId;

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
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/transactions',
        'POST',
        {
          Authorization: 'Bearer ' + auth.token,
        },
        JSON.stringify({
          ticker: ticker.toUpperCase().trim(),
          price,
          quantity,
          user: userId,
        })
      );

      dispatch(uiActions.increment());
      clearError();

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
          {error && <p className={classes.error_message}>{errorMessage}</p>}
        </form>
      }

      {/* TODO: IMPLEMENT REUSABLE FORM */}
    </div>
  );
};

export default AddTransactions;
