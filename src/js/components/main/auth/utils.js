import axios from 'axios';

export default function authRequest(
  inpLogin,
  inpPass,
  setState,
  history,
  initialAdviser,
  setEditStatus
) {
  axios({
    method: 'post',
    url: '/auth/login',
    data: {
      login: inpLogin,
      pass: inpPass
    }
  }).then(response => {
    if (!response.data) {
      setState(!response.data);
    } else if (response.data) {
      /* eslint-disable react/prop-types */
      switch (response.data.role) {
        case 'adviser':
          window.sessionStorage.setItem(
            'adviser_id',
            response.data.adviser.adviser_id
          );
          initialAdviser(response.data.adviser.adviser_id);
          setEditStatus(response.data.edit);
          return history.push('/adviser');
        case 'owner':
          window.sessionStorage.setItem('owner', true);
          return history.push('/owner');
        case 'manager':
          window.sessionStorage.setItem('manager', true);
          return history.push('/manager');
        default:
          return history.push('/');
      }
    } else {
      setState(true);
    }
    return null;
  });
}
