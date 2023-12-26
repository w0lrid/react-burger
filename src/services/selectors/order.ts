import { RootState } from '../../types';

const getOrderFromStore = (state: RootState) => state.order;
const getIngredientsFromStore = (state: RootState) => state.ingredients;
const getFeedFromStore = (state: RootState) => state.feed;
const getUserFromStore = (state: RootState) => state.user;
const getUserFeedFromStore = (state: RootState) => state.userFeed;

export { getOrderFromStore, getIngredientsFromStore, getFeedFromStore, getUserFromStore, getUserFeedFromStore };
