import { put, takeEvery } from 'redux-saga/effects';
import { Record } from 'immutable';

const ReducerRecord = Record({
  login: '',
  pass: '',
  edit: false,
  adviserId: null
});

export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGIN_REQUEST = 'SET_LOGIN_REQUEST';

export const SET_PASS = 'SET_PASS';
export const SET_PASS_REQUEST = 'SET_PASS_REQUEST';

export const SET_EDIT_STATUS = 'SET_EDIT_STATUS';
export const SET_EDIT_STATUS_REQUEST = 'SET_EDIT_STATUS_REQUEST';

export const SET_ADVISER_ID = 'SET_ADVISER_ID';
export const SET_ADVISER_ID_REQUEST = 'SET_ADVISER_ID_REQUEST';

/* eslint-disable no-param-reassign */
export default function authReducer(state = new ReducerRecord(), action) {
  const { type, data, status } = action;
  switch (type) {
    case SET_LOGIN:
      return state.set('login', data);
    case SET_PASS:
      return state.set('pass', data);
    case SET_EDIT_STATUS:
      return state.set('edit', status);
    case SET_ADVISER_ID:
      return state.set('adviserId', data);
    default:
      return state;
  }
}

// Requests
export function initialAdviser(id) {
  return { type: SET_ADVISER_ID_REQUEST, to: SET_ADVISER_ID, data: id };
}

export function changeLogin(login) {
  return { type: SET_LOGIN_REQUEST, to: SET_LOGIN, data: login };
}

export function changePass(pass) {
  return { type: SET_PASS_REQUEST, to: SET_PASS, data: pass };
}

export function setEditStatus(status) {
  return { type: SET_EDIT_STATUS_REQUEST, to: SET_EDIT_STATUS, data: status };
}

// Sagas
export const handlerSaga = function* setEditStatusSaga(action) {
  yield put({
    type: action.to,
    data: action.data
  });
};

export const saga = function* saga() {
  yield takeEvery(SET_ADVISER_ID_REQUEST, handlerSaga);
  yield takeEvery(SET_LOGIN_REQUEST, handlerSaga);
  yield takeEvery(SET_PASS_REQUEST, handlerSaga);
  yield takeEvery(SET_EDIT_STATUS_REQUEST, handlerSaga);
};
