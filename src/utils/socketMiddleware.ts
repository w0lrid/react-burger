import { getCookie } from './cookies';
import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../types';
import { TWSActionsConstants } from '../services/actions/feed-socket';
import { TUserWSActionsConstants } from '../services/actions/user-feed-socket';

export type TAllWSActions = TWSActionsConstants | TUserWSActionsConstants;

export const socketMiddleware = (url: string, actions: TAllWSActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => {
      return (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsConnect, onOpen, onClose, onError, onOrders } = actions;
        const accessToken = getCookie('accessToken');

        if (type === wsConnect) {
          socket = new WebSocket(`${url}${type === wsConnect && payload && accessToken ? `?token=${payload}` : ''}`);
        }

        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen });
          };
          socket.onerror = () => {
            dispatch({ type: onError });
          };
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success } = parsedData;

            success && dispatch({ type: onOrders, payload: parsedData });
          };
        }

        if (socket && type === onClose) {
          socket.close(1000);
          socket.onclose = (event) => {
            dispatch({ type: onClose });
          };
        }

        next(action);
      };
    };
  };
};
