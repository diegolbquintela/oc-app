import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import TransactionsListItem from './TransactionsListItem';
import classes from './TransactionsList.module.css';

const Holdings = (props) => {
  const auth = useContext(AuthContext);
  const [holdings, setHoldings] = useState([]);
  const updateTransactions = useSelector((state) => state.ui.transactionsList);
  const { isLoading, error, errorMessage, sendRequest, clearError } = useHttp();

  // userID
  const userId = auth.userId;

  useEffect(() => {
    let isMounted = true;

    const getTransactions = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/transactions/${userId}`,
          'GET',
          {},
          null
        );

        if (isMounted) setHoldings(responseData.transactions);
      } catch (err) {
        console.log(err.message);
      }
    };

    clearError();
    getTransactions();

    return () => {
      isMounted = false;
    };
  }, [sendRequest, userId, updateTransactions]);

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
