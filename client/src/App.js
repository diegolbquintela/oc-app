import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './header/components/Header';
import Holdings from './holdings/pages/Holdings';

const UpdateTransactions = React.lazy(() =>
  import('./holdings/pages/UpdateTransaction')
);
const Articles = React.lazy(() => import('./articles/pages/Articles'));

const routes = (
  <article>
    <Switch>
      <Route path="/" exact>
        <Holdings />
      </Route>
      <Route path="/articles" exact>
        <Articles />
      </Route>
    </Switch>
    <Redirect to="/" />
  </article>
);

function App() {
  return (
    <Router>
      <Header />
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
    </Router>
  );
}

export default App;
