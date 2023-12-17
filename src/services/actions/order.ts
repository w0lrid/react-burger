import { orderURL } from '../../config/constants';
import { checkResponse } from '../../utils/checkResponse';
import { getCookie } from '../../utils/cookies';
import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_SELECTED_ORDER,
  GET_SELECTED_ORDER_FAILED,
  GET_SELECTED_ORDER_SUCCESS,
} from '../constants/order';
import { AppDispatch, AppThunk } from '../../types';

type TGetOrder = {
  readonly type: typeof GET_ORDER;
};

type TGetOrderSuccess = {
  readonly type: typeof GET_ORDER_SUCCESS;
};

type TGetOrderFailed = {
  readonly type: typeof GET_ORDER_FAILED;
};

type TGetSelectedOrder = {
  readonly type: typeof GET_SELECTED_ORDER;
};

type TGetSelectedOrderSuccess = {
  readonly type: typeof GET_SELECTED_ORDER_SUCCESS;
};

type TGetSelectedOrderFailed = {
  readonly type: typeof GET_SELECTED_ORDER_FAILED;
};

export type TOrderActions = TGetOrder | TGetOrderSuccess | TGetOrderFailed;
export type TSelectedOrderActions = TGetSelectedOrder | TGetSelectedOrderSuccess | TGetSelectedOrderFailed;

export const getOrder: AppThunk = (orderIngredientsIds: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER,
    });

    fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${getCookie('accessToken')}`,
      },
      body: JSON.stringify({ ingredients: orderIngredientsIds }),
    })
      .then(checkResponse)
      .then(({ order }) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};
export const getSelectedOrder: AppThunk = (number: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_SELECTED_ORDER,
    });

    fetch(`${orderURL}/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(checkResponse)
      .then((response) => {
        dispatch({
          type: GET_SELECTED_ORDER_SUCCESS,
          selectedOrder: response.orders[0],
        });
      })
      .catch(() => {
        dispatch({
          type: GET_SELECTED_ORDER_FAILED,
        });
      });
  };
};
