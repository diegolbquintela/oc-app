import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/UIElements/Button/Button';
import classes from './Authentication.module.css';

const Authentication = (props) => {
  const history = useHistory();
  const submitLoginHandler = () => {
    history.push('/u1/transactions');
  };

  return (
    <form onSubmit={submitLoginHandler} className={classes.form}>
      <div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" placeholder="E-mail" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" />
        </div>
        <div className={classes.btn_center}>
          <Button>Login</Button>
        </div>
      </div>
    </form>
  );
};

export default Authentication;
