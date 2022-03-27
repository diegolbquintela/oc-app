import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/UIElements/Button/Button';
import classes from './Auth.module.css';

const Signup = (props) => {
  const auth = useContext(AuthContext);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formRef = useRef();

  const history = useHistory();

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    //TODO: add client side auth

    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + '/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          }),
        }
      );

      await response.json();
      if (!response.ok) {
        throw new Error(response.message);
      }
      auth.login();
    } catch (err) {
      console.log(err);
    }

    //auth.login();

    history.push('/u1/transactions');
  };

  return (
    <form ref={formRef} onSubmit={submitLoginHandler} className={classes.form}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            required
            placeholder="Name"
            ref={nameInputRef}
          />
        </div>
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
          <Button>Sign up</Button>
        </div>
        <div className={classes.signup}>
          <p>Already a member?</p>
          <Button
            type="button"
            onClick={props.onLoginClick}
            className={classes.btn_center}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
