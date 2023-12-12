import { TStore, TStoreIngredients, TStoreOrder } from '../../types/types';

const getOrderFromStore = (state: TStore): TStoreOrder => state.order;
const getIngredientsFromStore = (state: TStore): TStoreIngredients => state.ingredients;

export { getOrderFromStore, getIngredientsFromStore };
