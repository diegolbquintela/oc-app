import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/UIElements/Button/Button';
import classes from './Auth.module.css';

const Signup = (props) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const history = useHistory();

  const submitLoginHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //TODO: add client side auth

    const url = 'TODO: ADD SERVER ENDPOINT';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
      } else {
        res.json().then((data) => {
          //TODO: show error modal
          console.log(data);
        });
      }
    });

    history.push('/u1/transactions');
  };

  return (
    <form onSubmit={submitLoginHandler} className={classes.form}>
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
