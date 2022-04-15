import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../shared/store/ui-slice';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttp } from '../../shared/hooks/http-hook';
import classes from './TransactionsList.module.css';

const TransactionsListItem = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error, errorMessage, sendRequest, clearError } = useHttp();

  const userId = auth.userId;

  const editButtonHandler = (transactionId) => {
    history.push(`/holdings/${transactionId}`);
  };

  // TODO: push DELETE logic into a separate component
  const removeButtonHandler = async (transactionId) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          `/transactions/${userId}/${transactionId}`,
        'DELETE',
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        },
        null
      ).then(() => {
        console.log(transactionId + ' deleted');
        dispatch(uiActions.decrement());
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
          // onDelete={props.onDelete}
          className={classes.delete_btn}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default TransactionsListItem;
