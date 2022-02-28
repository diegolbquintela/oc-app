import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
      <header>Holdings</header>

      {isLoading || (
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
      )}
    </>
  );
};

export default Holdings;
