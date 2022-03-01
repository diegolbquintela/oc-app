import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './TransactionsList.module.css';

const Holdings = (props) => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // userID
  const userId = 'u1';

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const getTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/transactions/${userId}`
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

  const editButtonHandler = (transactionId) => {
    history.push(`/holdings/${transactionId}`);
  };

  const removeButtonHandler = (transactionId) => {
    try {
      fetch(
        `http://localhost:8000/api/transactions/${userId}/${transactionId}`,
        {
          method: 'DELETE',
        }
      ).then(() => {
        console.log(transactionId + ' deleted');
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {isLoading || (
        <div>
          <div>
            <ul className={classes.list}>
              {holdings.map((item) => (
                <li key={item._id}>
                  <p>
                    {`${item.ticker} $${item.price.toFixed(2)} - ${
                      item.quantity
                    } shares. Total: $${item.amount.toFixed(2)}.`}
                  </p>

                  <button
                    onClick={() => editButtonHandler(item._id)}
                    className={classes.edit_btn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => removeButtonHandler(item._id)}
                    className={classes.delete_btn}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Holdings;
