import { checkResponse } from './checkResponse';
import { authTokenURL } from '../config/constants';

export const refreshToken = () => {
  return fetch(authTokenURL, {
    method: 'POST',
    body: JSON.stringify(localStorage.getItem('refreshToken')),
  })
    .then(checkResponse)
    .then((response) => response)
    .catch(() => {
      console.error('something went wrong');
    });
};
