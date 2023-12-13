import { orderURL } from '../../config/constants';
import { checkResponse } from '../../utils/checkResponse';
import { getCookie } from '../../utils/cookies';

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_SELECTED_ORDER = 'GET_SELECTED_ORDER';
export const GET_SELECTED_ORDER_SUCCESS = 'GET_SELECTED_ORDER_SUCCESS';
export const GET_SELECTED_ORDER_FAILED = 'GET_SELECTED_ORDER_FAILED';
export const SET_BUN = 'SET_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const getOrder = (orderIngredientsIds: string[]) => {
  // @ts-ignore
  return function (dispatch) {
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
export const getSelectedOrder = (number: string) => {
  // @ts-ignore
  return function (dispatch) {
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
