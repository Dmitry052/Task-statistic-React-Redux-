import { combineReducers } from 'redux';
import authReducer from './../ducks/Auth';
import initial from './../ducks/InitialData';
import manager from './../ducks/Manager';

export default combineReducers({
  authReducer,
  initial,
  manager
});
