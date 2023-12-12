import { deleteCookie, getCookie, setCookie } from './cookies';
import { authTokenURL } from '../config/constants';
import { TIngredient } from '../types/types';

// @ts-ignore
export const request = async (url, options) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};

// @ts-ignore
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const refreshToken = () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refresh'),
    }),
  };
  request(authTokenURL, options)
    .then(({ success, accessToken }) => {
      if (success) {
        deleteCookie('access');
        setCookie('access', accessToken);
      }
    })
    .catch(console.warn);
};

// @ts-ignore
export const generateKey = (element, index) => {
  return `${element._id}${index}`;
};

export const filterIngredients = (arr: string[], data: TIngredient[]): (TIngredient & { key: string })[] =>
  arr
    .map((item) => {
      return data.filter((i) => i._id === item);
    })
    .reduce((acc, item) => {
      return acc.concat(item);
    })
    .map((item, index) => ({ ...item, key: generateKey(item, index) }));

// @ts-ignore
export const calculatePrice = (arr, data) => {
  return filterIngredients(arr, data).reduce((acc, item) => acc + item.price, 0);
};

// @ts-ignore
export const includesIngredients = (data, arr) => {
  // @ts-ignore
  return data.filter((item) => arr.includes(item._id));
};

// @ts-ignore
export const getOrderDate = (date) => {
  const options = {
    month: 'long',
    day: 'numeric',
    timezone: 'Moscow',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };

  // @ts-ignore
  return new Date(Date.parse(date)).toLocaleString('ru', options);
};
