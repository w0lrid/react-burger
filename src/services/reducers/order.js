import { ADD_INGREDIENT, GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "../actions/order";
import ingredient from "../../components/burger-ingredients/ingredient/ingredient";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
  ingredients: [],
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
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      }
    }
    default: {
      return state
    }
  }
}