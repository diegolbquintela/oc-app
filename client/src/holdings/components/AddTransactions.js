import React, { useState, useRef, useEffect } from 'react';

// TODO: add condition: buy or sell
const AddTransactions = (props) => {
  let transaction;

  const [holdings, setHoldings] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

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

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/transactions/u1'
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setHoldings(responseData.transactions);
      } catch (err) {
        console.log(err.message);
      }
    };
    getTransactions();
  }, [holdings]);

  const editButtonHandler = (e) => {};

  const removeButtonHandler = (transactionId) => {
    try {
      fetch(`http://localhost:8000/api/transactions/${transactionId}`, {
        method: 'DELETE',
      }).then(() => {
        setIsFetched(false);
        console.log(transactionId + ' deleted');
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Add Transactions</h1>

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

      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            {holdings.map((item) => (
              <li key={item._id}>
                {`${item.ticker} $${item.price} ${item.quantity} shares`}
                <button onClick={() => editButtonHandler(item._id)}>
                  edit
                </button>
                <button onClick={() => removeButtonHandler(item._id)}>
                  remove
                </button>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactions;
