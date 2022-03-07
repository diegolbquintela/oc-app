import React, { useState, useEffect } from 'react';

import TransactionsListItem from './TransactionsListItem';
import classes from './TransactionsList.module.css';

const Holdings = (props) => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // userID
  const userId = 'u1';

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
          throw new Error(responseData.message);
        }

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
  }, [holdings]);

  return (
    <>
      {isLoading || (
        <div className={classes.container}>
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
