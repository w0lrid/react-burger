import { checkResponse } from './checkResponse';
import { refreshToken } from './refreshToken';
import { setCookie } from './cookies';
import { TRequest } from '../types/types';

export const fetchWithRefresh = async (url: string, options?: TRequest) => {
  try {
    const res = await fetch(url, options); //делаем запрос

    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken); //(или в cookies)

      if (options) {
        options.headers.authorization = refreshData.accessToken;
      }

      const res = await fetch(url, options); //вызываем перезапрос данных

      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
