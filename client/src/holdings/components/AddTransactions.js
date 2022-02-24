import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

import { transactionActions } from '../../store/transactionSlice';

// TODO: add condition: buy or sell
const AddTransactions = (props) => {
  //TODO: new state action for dispatching
  const editButtonHandler = (e) => {};
  const removeButtonHandler = (e) => {};

  let transaction;
  const dispatch = useDispatch();
  const showHoldings = useSelector((state) => state.transaction.holdings);
  console.log(showHoldings);

  const [holdings, setHoldings] = useState(showHoldings);

  const tickerInputRef = useRef();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    transaction = {
      ticker: tickerInputRef.current.value.toUpperCase().trim(),
      price: priceInputRef.current.value,
      quantity: quantityInputRef.current.value,
    };

    dispatch(transactionActions.addTransaction(transaction));
  };

  useEffect(() => {
    setHoldings(showHoldings);
  }, [showHoldings]);

  return (
    <div>
      <h1>Add Transactions</h1>

      <form onSubmit={submitHandler}>
        <label htmlFor="text">Company Ticker: </label>
        <input
          ref={tickerInputRef}
          type="text"
          //value={enteredTicker}
          placeholder="Ticker"
          //onChange={(e) => setEnteredTicker(e.target.value)}
        />

        <label htmlFor="price">Price</label>
        <input
          ref={priceInputRef}
          type="number"
          //value={enteredPrice}
          placeholder="Price"
          //onChange={(e) => setEnteredPrice(e.target.value)}
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          ref={quantityInputRef}
          type="number"
          //value={enteredQuantity}
          placeholder="Shares/Quantity"
          // onChange={(e) => setEnteredQuantity(e.target.value)}
        />

        <button>Add Transactions</button>
      </form>
      {/* <ul>
        {holdings.map((item) => (
          <li key={item.ticker}>
            {`${item.ticker} $${item.price} ${item.quantity} shares`}
            <button onClick={editButtonHandler}>edit</button>
            <button onClick={removeButtonHandler}>remove</button>
          </li>
        ))}
      </ul>
      {holdings.length > 0 && <button>submit</button>} */}
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            {holdings.map((item) => (
              <li key={item.ticker}>
                {`${item.ticker} $${item.price} ${item.quantity} shares`}
                <button onClick={editButtonHandler}>edit</button>
                <button onClick={removeButtonHandler}>remove</button>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactions;
