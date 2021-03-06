import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

import Button from '../../shared/components/UIElements/Button/Button';

import classes from './UpdateTransaction.module.css';

const UpdateTransactions = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState('');
  const transactionId = useParams().transactionId;
  const history = useHistory();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();

  const userId = auth.userId;

  const getTransactions = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `/transactions/${userId}/${transactionId}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setFetchedData(responseData.transaction);
      console.log(fetchedData);
    } catch (err) {
      console.log(err.message);
    }
  }, [fetchedData, transactionId, userId, auth.token]);

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
        process.env.REACT_APP_BACKEND_URL +
          `/transactions/${userId}/${transactionId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
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

    history.push(`/${userId}/transactions`);
  };

  if (isLoading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <article>
      <h2>Update Transaction</h2>
      <h4>{fetchedData.ticker}</h4>

      <form onSubmit={submitHandler}>
        <div className={classes.form}>
          <div>
            <label htmlFor="price">Price</label>
            <input
              ref={priceInputRef}
              defaultValue={fetchedData.price}
              type="number"
              step="0.00000000000000001"
              placeholder="Price"
            />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              ref={quantityInputRef}
              defaultValue={fetchedData.quantity}
              type="number"
              step="0.00000000000000001"
              placeholder="Shares/Quantity"
            />
          </div>
        </div>
        <div className={classes.btn_center}>
          <Button>Update Transactions</Button>
        </div>
      </form>

      {/* TODO: IMPLEMENT REUSABLE FORM */}
      {/* <Form
        submitHandler={submitHandler}
        priceRef={priceInputRef}
        quantityInputRef={quantityInputRef}
        button={`Update Transaction`}
      /> */}
    </article>
  );
};

export default UpdateTransactions;
