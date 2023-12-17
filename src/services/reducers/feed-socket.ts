import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
  WS_USER_NAME_UPDATE,
} from '../constants/feed-socket';
import { TOrder } from '../../types/types';
import { TWSActions } from '../actions/feed-socket';
import { TAppActions } from '../../types';

type TFeedInitialState = {
  wsConnected: boolean;
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
};

const initialState: TFeedInitialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
};

export const feedReducer = (state: TFeedInitialState = initialState, action: TAppActions): TFeedInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_GET_ORDERS: {
      return {
        ...state,
        orders: state.orders.length < 10 ? [...state.orders, ...action.payload.orders] : [...state.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    case WS_SEND_MESSAGE: {
      return {
        ...state,
      };
    }
    case WS_USER_NAME_UPDATE: {
      return {
        ...state,
        // user: action.payload
      };
    }
    default:
      return state;
  }
};
