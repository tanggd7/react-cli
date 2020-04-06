import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import DynamicModule from './tools/dynamic';
import store, { history } from './redux/store';

const Home = DynamicModule({
  loader: () =>
    import(/* webpackChunkName: "Home" */ './components/home/module/home'),
});
const Forget = DynamicModule({
  loader: () =>
    import(
      /* webpackChunkName: "Forget" */ './components/session/module/forget'
    ),
});
const Register = DynamicModule({
  loader: () =>
    import(
      /* webpackChunkName: "Register" */ './components/register/module/register'
    ),
});
const Center = DynamicModule({
  loader: () =>
    import(
      /* webpackChunkName: "Center" */ './components/center/module/center'
    ),
});

const Router = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/forget" component={Forget} />
        <Route path="/register" component={Register} />
        <Route path="/center" component={Center} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Router;
