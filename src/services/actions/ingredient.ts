import { TIngredient } from '../../types/types';
import { CLOSE_INGREDIENT, SHOW_INGREDIENT } from '../constants/ingredient';

export interface IShowIngredient {
  readonly type: typeof SHOW_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface ICloseIngredient {
  readonly type: typeof CLOSE_INGREDIENT;
}

export type TIngredientActions = IShowIngredient | ICloseIngredient;

export const showIngredient = (ingredient: TIngredient): IShowIngredient => ({
  type: SHOW_INGREDIENT,
  ingredient,
});

export const closeIngredient = (): ICloseIngredient => ({
  type: CLOSE_INGREDIENT,
});
