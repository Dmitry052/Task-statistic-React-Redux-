// flow
import { Record } from 'immutable';

type Action = { type: string, data: number | string };
type Dispatch = Action => void;

const ReducerRecord = {
  login: '',
  pass: '',
  edit: false,
  adviserId: null,
  ssr: false,
  payform_url: ''
};

export const SET_LOGIN = 'SET_LOGIN';
export const SET_PASS = 'SET_PASS';
export const SET_SSR = 'SET_SSR';
export const SET_PAYFORM_URL = 'SET_PAYFORM_URL';

export const SET_EDIT_STATUS = 'SET_EDIT_STATUS';
export const SET_ADVISER_ID = 'SET_ADVISER_ID';

export default function authReducer(
  state: Object = ReducerRecord,
  action: Object
): Record {
  const { type, data } = action;
  switch (type) {
    case SET_LOGIN:
      return { ...state, login: data };
    case SET_PASS:
      return { ...state, pass: data };
    case SET_SSR:
      return { ...state, ssr: data };
    case SET_PAYFORM_URL:
      return { ...state, payform_url: data };
    default:
      return state;
  }
}

export const initialAdviser = (id: number): any => (dispatch: Dispatch) => {
  dispatch({ type: SET_ADVISER_ID, data: id });
};

export const changeLogin = (login: string): any => (dispatch: Dispatch) => {
  dispatch({ type: SET_LOGIN, data: login });
};

export const changePass = (pass: string): any => (dispatch: Dispatch) => {
  dispatch({ type: SET_PASS, data: pass });
};

export const changeSSR = (ssr: boolean): any => (dispatch: Dispatch) => {
  dispatch({ type: SET_SSR, data: ssr });
};

export const changePayformUrl = (url: string): any => (dispatch: Dispatch) => {
  dispatch({ type: SET_PAYFORM_URL, data: url });
};

export const setEditStatus = (status: string): any => (dispatch: Dispatch) => {
  dispatch({ type: SET_EDIT_STATUS, data: status });
};
