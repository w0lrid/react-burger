import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from '../constants/ingredients';
import { TIngredient } from '../../types/types';

type TIngredientsInitialState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: TIngredient[];
};

const initialState: TIngredientsInitialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
};

export const ingredientsReducer = (
  state: TIngredientsInitialState = initialState,
  // @ts-ignore
  action
): TIngredientsInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
