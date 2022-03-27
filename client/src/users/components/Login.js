import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/UIElements/Button/Button';
import classes from './Auth.module.css';

const Login = (props) => {
  const auth = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formRef = useRef();
  const history = useHistory();

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + '/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);
      auth.login();
    } catch (err) {
      console.log(err);
    }

    //history.push('/u1/transactions');
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
      </div>
    </form>
  );
};

export default Login;
