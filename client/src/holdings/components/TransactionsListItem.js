import { useHistory } from 'react-router-dom';

import classes from './TransactionsList.module.css';

const TransactionsListItem = (props) => {
  const history = useHistory();

  const editButtonHandler = (transactionId) => {
    history.push(`/holdings/${transactionId}`);
  };

  const removeButtonHandler = (transactionId) => {
    try {
      fetch(
        process.env.REACT_APP_BACKEND_URL +
          `/transactions/${props.userId}/${transactionId}`,
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
    <li key={props._id}>
      <div className={classes.list_text}>
        <p>{`${props.ticker}`}</p>
        <p>{`Price: $${props.price.toFixed(2)} `}</p>
        <p>{`Shares: ${props.quantity}`}</p>
        <p>{`Total: $${props.amount.toFixed(2)}`}</p>
      </div>

      <div className={classes.btn}>
        <button
          onClick={() => editButtonHandler(props._id)}
          className={classes.edit_btn}
        >
          Edit
        </button>
      </div>
      <div className={classes.btn}>
        <button
          onClick={() => removeButtonHandler(props._id)}
          className={classes.delete_btn}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default TransactionsListItem;
