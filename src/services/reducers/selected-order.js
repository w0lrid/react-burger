import { SHOW_SELECTED_ORDER, CLOSE_SELECTED_ORDER } from '../actions/selected-order';

const initialState = {
  selectedOrder: null,
  opened: false,
};

export const selectedFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SELECTED_ORDER: {
      return {
        selectedOrder: action.selectedOrder,
        opened: !state.opened,
      };
    }
    case CLOSE_SELECTED_ORDER: {
      return {
        selectedOrder: null,
        opened: !state.opened,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
