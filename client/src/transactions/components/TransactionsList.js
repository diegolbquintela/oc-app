import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { AuthContext } from '../../shared/context/auth-context';
import TransactionsListItem from './TransactionsListItem';
import classes from './TransactionsList.module.css';

const Holdings = (props) => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const updateTransactions = useSelector((state) => state.ui.transactionsList);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // userID
  let userId;
  const getUserId = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/transactions/${userId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const getTransactions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/transactions/${userId}`
        );
        const responseData = await response.json();

        if (!response.ok) {
          setError(true);
          setErrorMessage(responseData.message);
          throw new Error(responseData.message);
        }

        setError(false);
        if (isMounted) setHoldings(responseData.transactions);
      } catch (err) {
        console.log(err.message);
      }
    };
    getTransactions();
    setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [updateTransactions]);

  // delete handler

  return (
    <>
      {isLoading && <p>loading...</p>}
      {isLoading || (
        <div className={classes.container}>
          {error && <p className={classes.error_message}>{errorMessage}</p>}
          <ul className={classes.list}>
            {holdings.map((item) => (
              <TransactionsListItem
                key={item._id}
                userId={item.userID}
                ticker={item.ticker}
                price={item.price}
                quantity={item.quantity}
                amount={item.amount}
                _id={item._id}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Holdings;
