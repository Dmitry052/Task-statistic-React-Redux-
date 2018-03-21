/* eslint-disable react/jsx-filename-extension */
/* global document */
/* flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
import store from './store';
import App from './components/App';
import Auth from './components/main/auth/Form';
import Partner from './components/main/partner';
import Owner from './components/main/owner';
import Manager from './components/main/manager';

const context = {
  insertCss: (...styles) => {
    /* eslint-disable no-underscore-dangle */
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  }
};

ReactDOM.render(
  <App context={context}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/auth/login" component={Auth} />
          <Route exact path="/adviser" component={Partner} />
          <Route exact path="/owner" component={Owner} />
          <Route exact path="/manager" component={Manager} />
        </Switch>
      </Router>
    </Provider>
  </App>,
  document.getElementById('root')
);
