import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttp } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/UIElements/Button/Button';
import classes from './Auth.module.css';

const Signup = (props) => {
  const auth = useContext(AuthContext);
  const [userExistsError, setUserExistsError] = useState(null);
  const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formRef = useRef();
  const { isLoading, error, errorMessage, sendRequest, clearError } = useHttp();

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    // TODO: improve client validation
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/signup',
        'POST',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({
          name: nameInputRef.current.value,
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        })
      );

      auth.login(responseData.userId, responseData.token);
      history.push('/');
    } catch (err) {
      setUserExistsError(err.message);
      console.log(err);
    }

    clearError();
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

        <div className={classes.error_message}>
          {userExistsError && <p>{userExistsError}</p>}
          {error && <p>{errorMessage}</p>}
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
            Switch to Login
          </Button>
        </div>

        {isLoading && <p>Loading...</p>}
      </div>
    </form>
  );
};

export default Signup;
