import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttp } from '../../hooks/http-hook';
import Button from '../../shared/components/UIElements/Button/Button';
import classes from './Auth.module.css';

const Login = (props) => {
  const auth = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formRef = useRef();
  const history = useHistory();
  const { isLoading, error, errorMessage, sendRequest, clearError } = useHttp();

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/login',
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        })
      );

      console.log(responseData.user.id);
      auth.login(responseData.user.id);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form ref={formRef} onSubmit={submitLoginHandler} className={classes.form}>
      <div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            required
            placeholder="E-mail"
            ref={emailInputRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            ref={passwordInputRef}
          />
        </div>

        <div className={classes.error_message}>
          {error && <p>{errorMessage}</p>}
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
            Sign up
          </Button>
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
    </form>
  );
};

export default Login;
