import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/UIElements/Button/Button';
import Login from '../components/Login';
import Signup from '../components/Signup';
import classes from './Authentication.module.css';

const Authentication = (props) => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  const loginHandler = () => {
    setLogin(true);
    setSignup(false);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    setSignup(true);
    setLogin(false);
  };

  return (
    <div className={classes.auth}>
      {login && <Login onSignupClick={signupHandler} />}
      {signup && <Signup onLoginClick={loginHandler} />}
    </div>
  );
};

export default Authentication;
