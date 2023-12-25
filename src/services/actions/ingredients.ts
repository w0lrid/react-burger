import { ingredientsURL } from '../../config/constants';
import { checkResponse } from '../../utils/checkResponse';
import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from '../constants/ingredients';
import { AppThunk } from '../../types';

type TGetIngredients = {
  readonly type: typeof GET_INGREDIENTS;
};

type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
};

type TGetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TIngredientsActions = TGetIngredients | TGetIngredientsSuccess | TGetIngredientsFailed;

export const getIngredients: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    fetch(ingredientsURL)
      .then(checkResponse)
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};