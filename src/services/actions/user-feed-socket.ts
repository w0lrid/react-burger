export const USER_WS_CONNECTION_START = 'USER_WS_CONNECTION_START';
export const USER_WS_CONNECTION_SUCCESS = 'USER_WS_CONNECTION_SUCCESS';
export const USER_WS_CONNECTION_ERROR = 'USER_WS_CONNECTION_ERROR';
export const USER_WS_CONNECTION_CLOSED = 'USER_WS_CONNECTION_CLOSED';
export const USER_WS_GET_ORDERS = 'USER_WS_GET_ORDERS';
export const USER_WS_SEND_MESSAGE = 'USER_WS_SEND_MESSAGE';
export const USER_WS_USER_NAME_UPDATE = 'USER_WS_USER_NAME_UPDATE';

export const userWsActions = {
  wsConnect: USER_WS_CONNECTION_START,
  wsSendMessage: USER_WS_SEND_MESSAGE,
  onOpen: USER_WS_CONNECTION_SUCCESS,
  onClose: USER_WS_CONNECTION_CLOSED,
  onError: USER_WS_CONNECTION_ERROR,
  onOrders: USER_WS_GET_ORDERS,
};

// @ts-ignore
export const userWsConnectionStart = (payload) => {
  return {
    type: USER_WS_CONNECTION_START,
    payload,
  };
};

export const userWsConnectionSuccess = () => {
  return {
    type: USER_WS_CONNECTION_SUCCESS,
  };
};

export const userWsConnectionError = () => {
  return {
    type: USER_WS_CONNECTION_ERROR,
  };
};

export const userWsConnectionClosed = () => {
  return {
    type: USER_WS_CONNECTION_CLOSED,
  };
};

// @ts-ignore
export const userWsGetOrders = (payload) => {
  return {
    type: USER_WS_GET_ORDERS,
    payload,
  };
};

// @ts-ignore
export const userWsSendMessage = (message) => {
  return {
    type: USER_WS_SEND_MESSAGE,
    payload: message,
  };
};

// @ts-ignore
export const userWsUserNameUpdate = (userName) => {
  return {
    type: USER_WS_USER_NAME_UPDATE,
    payload: userName,
  };
};
