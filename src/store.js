import { createStore, applyMiddleware } from 'redux';
import 'regenerator-runtime/runtime';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import listReducers from './redux/index';

const store = createStore(
  listReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
