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
  selectedOrder: any;
  bun: any;
  ingredients: TIngredient[];
};
export type TStoreUser = {
  userRequest: boolean;
  userFailed: boolean;
  user: any;
};
export type TStoreFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};
export type TStoreUserFeed = {
  orders: TOrder[];
};
export type TStore = {
  ingredients: TStoreIngredients;
  order: TStoreOrder;
  user: TStoreUser;
  feed: TStoreFeed;
  userFeed: TStoreUserFeed;
};
