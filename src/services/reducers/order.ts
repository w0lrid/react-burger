import {
  ADD_INGREDIENT,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  REMOVE_INGREDIENT,
  SET_BUN,
  SORT_INGREDIENTS,
} from '../constants/order';
import { TIngredient, TOrder } from '../../types/types';

type TOrderInitialState = {
  orderRequest: boolean;
  orderFailed: boolean;
  order: TOrder | null;
  selectedOrder: TOrder | null;
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TOrderInitialState = {
  orderRequest: false,
  orderFailed: false,
  order: null,
  selectedOrder: null,
  bun: null,
  ingredients: [],
};

// @ts-ignore
export const orderReducer = (state: TOrderInitialState = initialState, action): TOrderInitialState => {
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
