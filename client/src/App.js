import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Holdings from './holdings/pages/Holdings';
import Articles from './articles/pages/Articles';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Holdings />
        </Route>
        <Route path="/articles" exact>
          <Articles />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
