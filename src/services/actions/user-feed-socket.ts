import {
  USER_WS_CONNECTION_CLOSED,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_START,
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_GET_ORDERS,
  USER_WS_SEND_MESSAGE,
  USER_WS_USER_NAME_UPDATE,
} from '../constants/user-feed-socket';
import { TStoreUserFeed } from '../../types/types';

export interface IUserWSConnectionStart {
  readonly type: typeof USER_WS_CONNECTION_START;
  readonly payload: string;
}

export interface IUserWSConnectionSuccess {
  readonly type: typeof USER_WS_CONNECTION_SUCCESS;
}

export interface IUserWSConnectionError {
  readonly type: typeof USER_WS_CONNECTION_ERROR;
}

export interface IUserWSConnectionClosed {
  readonly type: typeof USER_WS_CONNECTION_CLOSED;
}

export interface IUserWSGetOrders {
  readonly type: typeof USER_WS_GET_ORDERS;
  readonly payload: TStoreUserFeed;
}

export interface IUserWSSendMessage {
  readonly type: typeof USER_WS_SEND_MESSAGE;
  readonly payload: string;
}

export interface IUserWSUserNameUpdate {
  readonly type: typeof USER_WS_USER_NAME_UPDATE;
  readonly payload: string;
}

export type TUserWSActionsConstants = {
  readonly wsConnect: typeof USER_WS_CONNECTION_START;
  readonly wsSendMessage: typeof USER_WS_SEND_MESSAGE;
  readonly onOpen: typeof USER_WS_CONNECTION_SUCCESS;
  readonly onClose: typeof USER_WS_CONNECTION_CLOSED;
  readonly onError: typeof USER_WS_CONNECTION_ERROR;
  readonly onOrders: typeof USER_WS_GET_ORDERS;
};

export type TUserWSActions =
  | IUserWSConnectionStart
  | IUserWSConnectionSuccess
  | IUserWSConnectionError
  | IUserWSConnectionClosed
  | IUserWSGetOrders
  | IUserWSSendMessage
  | IUserWSUserNameUpdate;

export const userWsActions: TUserWSActionsConstants = {
  wsConnect: USER_WS_CONNECTION_START,
  wsSendMessage: USER_WS_SEND_MESSAGE,
  onOpen: USER_WS_CONNECTION_SUCCESS,
  onClose: USER_WS_CONNECTION_CLOSED,
  onError: USER_WS_CONNECTION_ERROR,
  onOrders: USER_WS_GET_ORDERS,
};

export const userWsConnectionStart = (token: string): IUserWSConnectionStart => ({
  type: USER_WS_CONNECTION_START,
  payload: token,
});

export const userWsConnectionSuccess = (): IUserWSConnectionSuccess => ({
  type: USER_WS_CONNECTION_SUCCESS,
});

export const userWsConnectionError = (): IUserWSConnectionError => ({
  type: USER_WS_CONNECTION_ERROR,
});

export const userWsConnectionClosed = (): IUserWSConnectionClosed => ({
  type: USER_WS_CONNECTION_CLOSED,
});

export const userWsGetOrders = (orders: TStoreUserFeed): IUserWSGetOrders => ({
  type: USER_WS_GET_ORDERS,
  payload: orders,
});

export const userWsSendMessage = (message: string): IUserWSSendMessage => ({
  type: USER_WS_SEND_MESSAGE,
  payload: message,
});

export const userWsUserNameUpdate = (userName: string): IUserWSUserNameUpdate => ({
  type: USER_WS_USER_NAME_UPDATE,
  payload: userName,
});
