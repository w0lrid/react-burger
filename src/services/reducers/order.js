import {
  ADD_INGREDIENT,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  REMOVE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../actions/order";

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
        ingredients: (() => {

          if (action.ingredient.type === 'bun') {
            const foundIndex = state.ingredients.findIndex(ingredient => ingredient.type === 'bun')

            if (foundIndex >= 0) {
              state.ingredients[foundIndex] = action.ingredient

              return [...state.ingredients]
            } else {
              return [...state.ingredients, action.ingredient]
            }
          }

          let isNewIngredient = true

          state.ingredients.forEach(ingredient => {
            if (ingredient._id === action.ingredient._id) {
              isNewIngredient = false
              ingredient.count = action.ingredient.count
            }
          })

          if (isNewIngredient) {
            return [...state.ingredients, action.ingredient]
          } else {
            return [...state.ingredients]
          }
        })(),
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: (() => {
          state.ingredients.forEach(ingredient => {
            if (ingredient._id === action._id) {
              --ingredient.count
            }
          })

          return state.ingredients
        })(),
      }
    }
    case SORT_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients
      }
    }
    default: {
      return state
    }
  }
}