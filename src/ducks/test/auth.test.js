import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Record } from 'immutable';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { Form } from './../../components/main/auth/Form';
import * as authDuck from './../Auth';
import reducer from './../Auth';

configure({ adapter: new Adapter() });

const login = 'TestLogin';
const pass = '!Wserd345';
const mockStore = configureMockStore([thunk]);
const initilaStore = {
  login: '',
  pass: '',
  edit: false,
  adviserId: null
};
const props = {
  changeLogin: jest.fn(),
  changePass: jest.fn(),
  setEditStatus: jest.fn(),
  initialAdviser: jest.fn(),
  user: {
    login: '',
    pass: ''
  }
};
const wrapper = shallow(<Form {...props} />);

describe('<Form />', () => {
  it('Events input for login and pass', () => {
    const valueLogin = 'Test login';
    const valuePass = 'Test pass';

    wrapper
      .find('[type="text"]')
      .simulate('change', { target: { value: valueLogin } });

    wrapper
      .find('[type="password"]')
      .simulate('change', { target: { value: valuePass } });

    expect(props.changeLogin).toHaveBeenCalledWith(valueLogin);
    expect(props.changePass).toHaveBeenCalledWith(valuePass);
  });
});

describe('Actions', () => {
  const store = mockStore(initilaStore);

  store.dispatch(authDuck.changeLogin(login));
  store.dispatch(authDuck.changePass(pass));

  it('should assign login action', () => {
    expect(store.getActions()[0]).toEqual({
      type: authDuck.SET_LOGIN,
      data: login
    });
  });

  it('should assign password action', () => {
    expect(store.getActions()[1]).toEqual({
      type: authDuck.SET_PASS,
      data: pass
    });
  });
});

describe('Reducers', () => {
  it('should be default values', () => {
    const def = reducer(undefined, {
      type: 'DEFAULT',
      data: 'def'
    });
    expect(def.login).toBe('');
    expect(def.pass).toBe('');
  });

  it('should assign login', () => {
    expect(
      reducer(undefined, {
        type: authDuck.SET_LOGIN,
        data: login
      }).login
    ).toEqual(login);
  });

  it('should assign password', () => {
    expect(
      reducer(undefined, {
        type: authDuck.SET_PASS,
        data: pass
      }).pass
    ).toEqual(pass);
  });
});
