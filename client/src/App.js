import React, { useState, useCallback, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import HomePage from './homepage/pages/HomePage';
import Authentication from './users/pages/Authentication';
import Header from './shared/components/Header/Header';
import Holdings from './transactions/pages/Holdings';
import Footer from './shared/components/Footer/Footer';

const UpdateTransactions = React.lazy(() =>
  import('./transactions/pages/UpdateTransaction')
);
const Articles = React.lazy(() => import('./articles/pages/Articles'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/u1/transactions" exact>
          <Holdings />
        </Route>
        {/* <Route path="/u1/articles" exact>
          <Articles />
        </Route> */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth" exact>
          <Authentication />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        {/* <Header /> */}
        <main>
          <Suspense
            fallback={
              <div className="center">
                <h4>loading...</h4>
              </div>
            }
          >
            <Route path="/holdings/:transactionId" exact>
              <UpdateTransactions />
            </Route>
          </Suspense>
          <article>{routes}</article>
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
