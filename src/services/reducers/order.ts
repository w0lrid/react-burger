import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from '../constants/order';
import { TIngredient, TOrder } from '../../types/types';
import { TAppActions } from '../../types';

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

export const orderReducer = (state: TOrderInitialState = initialState, action: TAppActions): TOrderInitialState => {
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
        order: action.payload.order,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
