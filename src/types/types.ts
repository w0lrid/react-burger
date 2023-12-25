import { TWSActions } from '../services/actions/feed-socket';
import { TUserWSActions } from '../services/actions/user-feed-socket';

export type TUser = {
  email: string;
  password: string;
  name: string;
};
export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  count: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
export type TOrder = {
  _id: number;
  number: number;
  createdAt: string;
  name: string;
  status: string;
  ingredients: string[];
};
export type TStoreIngredients = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: TIngredient[];
};
export type TStoreOrder = {
  orderRequest: boolean;
  orderFailed: boolean;
  order: TOrder;
  selectedOrder: TOrder;
  bun: TIngredient;
  ingredients: TIngredient[];
};
export type TStoreUser = {
  userRequest: boolean;
  userFailed: boolean;
  user: TUser;
};
export type TStoreFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};
export type TStoreUserFeed = TStoreFeed;
export type TStore = {
  ingredients: TStoreIngredients;
  order: TStoreOrder;
  user: TStoreUser;
  feed: TStoreFeed;
  userFeed: TStoreUserFeed;
};
export type TRequest = {
  method?: string;
  headers: {
    'Content-Type': string;
    authorization?: string;
  };
  body?: string;
};

export type TAllWSActions = TWSActions | TUserWSActions;
