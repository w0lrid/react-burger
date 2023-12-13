import {
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  SET_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENTS,
} from '../actions/order';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
  selectedOrder: null,
  bun: null,
  ingredients: [],
};

// @ts-ignore
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        order: action.order,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case SET_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: (() => {
          // @ts-ignore
          const indexOfIngredientToRemove = state.ingredients.findIndex((ingredient) => ingredient._id === action._id);
          const firstHalf = state.ingredients.slice(0, indexOfIngredientToRemove);
          const secondHalf = state.ingredients.slice(indexOfIngredientToRemove + 1);

          const orderWithoutRemovedIngredient = firstHalf.concat(secondHalf);

          return orderWithoutRemovedIngredient;
        })(),
      };
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    default: {
      return state;
    }
  }
};
