import { SHOW_INGREDIENT, CLOSE_INGREDIENT } from "../actions/ingredient";

const initialState = {
  ingredient: null,
  opened: false,
}

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT: {
      return {
        ingredient: action.ingredient,
        opened: !state.opened,
      }
    }
    case CLOSE_INGREDIENT: {
      return {
        ingredient: null,
        opened: !state.opened,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}