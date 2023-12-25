import { deleteCookie, getCookie, setCookie } from './cookies';
import { authTokenURL } from '../config/constants';
import { TIngredient, TRequest } from '../types/types';

export const request = async (url: string, options?: TRequest): Promise<any> => {
  const res = await fetch(url, options);
  return checkResponse(res);
};

const checkResponse = (res: Response) => {
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

export const generateKey = (element: TIngredient, index: number) => {
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

export const calculatePrice = (arr: string[], data: TIngredient[]) => {
  return filterIngredients(arr, data).reduce((acc, item) => acc + item.price, 0);
};

export const includesIngredients = (ingredients: TIngredient[], ingredientsIds: string[]): TIngredient[] => {
  return ingredients.filter((ingredient) => ingredientsIds.includes(ingredient._id));
};

export const getOrderDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    timeZone: 'Moscow',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };

  return new Date(Date.parse(date)).toLocaleString('ru', options);
};
