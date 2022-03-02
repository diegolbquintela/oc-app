import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './header/components/Header';
import Holdings from './holdings/pages/Holdings';
import Articles from './articles/pages/Articles';
import UpdateTransactions from './holdings/pages/UpdateTransaction';

function App() {
  return (
    <Router>
      <Header />
      <CssBaseline />
      <Switch>
        <Route path="/" exact>
          <Holdings />
        </Route>
        <Route path="/articles" exact>
          <Articles />
        </Route>
        <Route path="/holdings/:transactionId" exact>
          <UpdateTransactions />
        </Route>
      </Switch>
      <Redirect to="/" />
    </Router>
  );
}

export default App;
