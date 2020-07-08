import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import DynamicModule from './tools/dynamic';
import store, { history } from './redux/store';

const Home = DynamicModule({
  loader: () => import(/* webpackChunkName: "Home" */ './components/home/home'),
});

const Router = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/forget" component={Forget} /> */}
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Router;
