import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import HomePage from './shared/homepage/pages/HomePage';
import Authentication from './users/pages/Authentication';
import Header from './shared/components/Header/Header';

// TODO: change this component to TRANSACTIONS
import Holdings from './transactions/pages/Holdings';
import Footer from './shared/components/Footer/Footer';

import { useAuth } from './shared/hooks/auth-hook';

const UpdateTransactions = React.lazy(() =>
  import('./transactions/pages/UpdateTransaction')
);
const Articles = React.lazy(() => import('./articles/pages/Articles'));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path={`/${userId}/transactions`} exact>
          <Holdings />
        </Route>
        {/* <Route path={`/${userId}/articles`} exact>
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
          {/* <Route path={`/${userId}/articles`} exact>
          <Articles />
        </Route> */}
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
      }}
    >
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
            {/* FIX  */}
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
