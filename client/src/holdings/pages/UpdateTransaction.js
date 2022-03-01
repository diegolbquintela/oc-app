import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import classes from './UpdateTransaction.module.css';

const UpdateTransactions = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState('');
  const transactionId = useParams().transactionId;
  const history = useHistory();
  const userId = 'u1';
  const priceInputRef = useRef();
  const quantityInputRef = useRef();

  const getTransactions = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/transactions/${userId}/${transactionId}`
      );
      const responseData = await response.json();

      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setFetchedData(responseData.transaction);
      console.log(fetchedData);
    } catch (err) {
      console.log(err.message);
    }
  }, [fetchedData, transactionId]);

  // Get Transactions By Id
  useEffect(() => {
    setIsLoading(true);
    getTransactions();
    setIsLoading(false);
    return () => setIsLoading(false);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/transactions/${userId}/${transactionId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            price: priceInputRef.current.value,
            quantity: quantityInputRef.current.value,
          }),
        }
      );

      await response.json();
    } catch (err) {
      console.log(err);
    }

    history.push('/');
  };

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <article>
      <h2>Update Transaction</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.form}>
          <div>
            <label htmlFor="price">Price</label>
            <input
              ref={priceInputRef}
              defaultValue={fetchedData.price}
              type="number"
              placeholder="Price"
            />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              ref={quantityInputRef}
              defaultValue={fetchedData.quantity}
              type="number"
              placeholder="Shares/Quantity"
            />
          </div>
        </div>
        <div className={classes.btn_center}>
          <button className={classes.btn}>Update Transactions</button>
        </div>
      </form>
    </article>
  );
};

export default UpdateTransactions;
