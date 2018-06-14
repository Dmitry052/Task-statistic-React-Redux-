/* flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';

// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
// import gql from 'graphql-tag';

import store from './store';
import App from './components/App';
import Auth from './components/main/auth/Form';
import Owner from './components/main/owner';

// const clientApollo = new ApolloClient({
//   uri: 'http://localhost:3001/graphql'
// });

const context = {
  insertCss: (...styles: Array<Object>): void => {
    /* eslint-disable no-underscore-dangle */
    const removeCss = styles.map((x: Object): void => x._insertCss());
    return () => {
      removeCss.forEach((f: void): any => f());
    };
  }
};

ReactDOM.render(
  <App context={context}>
    {/* <ApolloProvider client={clientApollo}> */}
    <Provider store={store}>
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/auth/login" component={Auth} />
          <Route path="/:user" component={Owner} />
        </Switch>
      </Router>
    </Provider>
    {/* </ApolloProvider> */}
  </App>,
  window.document.getElementById('root')
);
