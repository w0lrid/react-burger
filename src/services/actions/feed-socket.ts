import { TOrder, TStoreFeed } from '../../types/types';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
  WS_USER_NAME_UPDATE,
} from '../constants/feed-socket';

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TStoreFeed;
}

export interface IWSSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
}

export interface IWSUserNameUpdate {
  readonly type: typeof WS_USER_NAME_UPDATE;
  readonly payload: string;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetOrders
  | IWSSendMessage
  | IWSUserNameUpdate;

export const wsActions = {
  wsConnect: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS,
};

export const wsConnectionStart = (): IWSConnectionStart => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsConnectionSuccess = (): IWSConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWSConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IWSConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetOrders = (payload: TStoreFeed): IWSGetOrders => {
  return {
    type: WS_GET_ORDERS,
    payload,
  };
};

export const wsSendMessage = (message: string): IWSSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};

export const wsUserNameUpdate = (userName: string): IWSUserNameUpdate => {
  return {
    type: WS_USER_NAME_UPDATE,
    payload: userName,
  };
};
