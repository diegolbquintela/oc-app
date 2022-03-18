import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/UIElements/Button/Button';
import classes from './Auth.module.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const submitLoginHandler = () => {
    history.push('/u1/transactions');
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={submitLoginHandler} className={classes.form}>
      <div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={emailInputHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={passwordInputHandler}
          />
        </div>
        <div className={classes.btn_center}>
          <Button type="submit">Login</Button>
        </div>
        <div className={classes.signup}>
          <p>Not a member?</p>
          <Button
            type="button"
            onClick={props.onSignupClick}
            className={classes.btn_center}
          >
            Sign up instead
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
