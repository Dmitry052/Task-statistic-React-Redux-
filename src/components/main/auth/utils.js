// @flow
import axios from 'axios';

export default function authRequest(
  inpLogin: string,
  inpPass: string,
  setState: (value: boolean) => void,
  setOptions: (ssr: boolean, url: string) => void,
  history: Object
) {
  axios({
    method: 'post',
    url: '/auth/login',
    data: {
      login: inpLogin,
      pass: inpPass
    }
  }).then((response: Object): boolean | null => {
    if (response.data.auth) {
      setState(false);
      window.localStorage.setItem('role', response.data.role);
      window.localStorage.setItem('user', response.data.user);
      
      switch (response.data.static) {
        case true:
          return window.location.replace('/');
        default:
          return history.push('/statistic');
      }
    } else {
      setState(true);
    }
    return null;
  });
}
