
import { ingredientsURL } from "../../config/constants";
import { checkResponse } from "../../utils/checkResponse";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    })

    fetch(ingredientsURL)
      .then(checkResponse)
      .then(({data}) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: data,
        })
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
}