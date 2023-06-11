import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "../actions/order";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.order,
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    default: {
      return state
    }
  }
}