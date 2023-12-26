export const checkResponse = (response: Response) =>
  response.ok ? response.json() : response.json().then(() => Promise.reject(`Ошибка ${response.status}`));
