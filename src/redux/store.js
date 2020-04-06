import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import reducer from './reducer';

// html 5 API
export const history = createBrowserHistory();

// 中间件
const middlewares = [thunk, routerMiddleware(history)];

// 增强器
const storeEnhancers = compose(applyMiddleware(...middlewares));

// 参数：函数，初始值，增强器
export default createStore(reducer, {}, storeEnhancers);
