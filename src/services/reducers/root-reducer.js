import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { feedReducer } from './feed-socket';
import { userOrdersSocketReducer } from './user-feed-socket';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  userFeed: userOrdersSocketReducer,
});
