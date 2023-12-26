import { store } from '../index';
import { TWSActions } from '../services/actions/feed-socket';
import { TIngredientActions } from '../services/actions/ingredient';
import { TSelectedOrderModalActions } from '../services/actions/selected-order';
import { TUserWSActions } from '../services/actions/user-feed-socket';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TIngredientsActions } from '../services/actions/ingredients';
import { TOrderActions, TSelectedOrderActions } from '../services/actions/order';
import { TUserActions } from '../services/actions/user';

export type RootState = ReturnType<typeof store.getState>;
export type TAppActions =
  | TWSActions
  | TIngredientActions
  | TIngredientsActions
  | TOrderActions
  | TSelectedOrderActions
  | TSelectedOrderModalActions
  | TUserActions
  | TUserWSActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type AppDispatch = typeof store.dispatch;
