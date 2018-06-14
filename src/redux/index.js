/* @flow */
import { combineReducers } from 'redux';
import authReducer from './../ducks/Auth';
import initialOwner from './../ducks/ownerInitialData';

export default combineReducers({
  authReducer,
  initialOwner
});
