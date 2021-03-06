import React from 'react';
import { render } from 'react-dom';
import Router from './router';

// 热加载
if (module.hot) {
  module.hot.accept();
}

render(<Router />, document.getElementById('root'));
