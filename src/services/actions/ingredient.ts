import { TIngredient } from '../../types/types';

export const SHOW_INGREDIENT = 'SHOW_INGREDIENT';
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT';

export const showIngredient = (ingredient: TIngredient) => ({
  type: SHOW_INGREDIENT,
  ingredient,
});

export const closeIngredient = () => ({
  type: CLOSE_INGREDIENT,
});
