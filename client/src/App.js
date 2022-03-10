import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Header from './shared/components/Header/Header';
import Holdings from './transactions/pages/Holdings';
import Footer from './shared/components/Footer/Footer';

const UpdateTransactions = React.lazy(() =>
  import('./transactions/pages/UpdateTransaction')
);
const Articles = React.lazy(() => import('./articles/pages/Articles'));

const routes = (
  <article>
    <Switch>
      <Route path="/u1/transactions" exact>
        <Holdings />
      </Route>
      <Route path="/u1/articles" exact>
        <Articles />
      </Route>
      <Redirect to="/" />
    </Switch>
  </article>
);

function App() {
  return (
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
        {routes}
      </main>
      <Footer />
    </Router>
  );
}

export default App;
