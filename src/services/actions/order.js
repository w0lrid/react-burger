import { orderURL } from "../../config/constants";
import { checkResponse } from "../../utils/checkResponse";

export const GET_ORDER  = 'GET_ORDER';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const SET_BUN = 'SET_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const getOrder = (orderIngredientsIds) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER,
    })

    fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ingredients: orderIngredientsIds}),
    })
      .then(checkResponse)
      .then(({order}) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED
        })
      })
  }
}