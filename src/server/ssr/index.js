import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';

import ContextProvider from './../../../src/components/App';
import reducers from './../../../src/redux';
import App from './client';

/* eslint-disable no-underscore-dangle */
const css: Set<any> = new Set();
const insertCss = (...styles: Array<Object>): any => {
  styles.forEach((style: Object): Object => css.add(style._getCss()));
};

const context = {
  insertCss
};

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(
  reducers,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
);

render(
  <ContextProvider context={context}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  </ContextProvider>,
  window.document.getElementById('root')
);
