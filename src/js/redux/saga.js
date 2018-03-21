import { all } from 'redux-saga/effects';
import { saga as authSaga } from './../ducks/Auth';

export default function* rootSaga() {
  yield all([authSaga()]);
}
