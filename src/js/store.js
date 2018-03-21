import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listReducers from './redux/index';
import saga from './redux/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  listReducers,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(saga);

export default store;
