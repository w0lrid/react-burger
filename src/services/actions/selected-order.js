export const SHOW_SELECTED_ORDER = 'SHOW_SELECTED_ORDER';
export const CLOSE_SELECTED_ORDER = 'CLOSE_SELECTED_ORDER';

export const showSelectedOrder = (selectedOrder) => ({
  type: SHOW_SELECTED_ORDER,
  selectedOrder,
});

export const closeSelectedOrder = () => ({
  type: CLOSE_SELECTED_ORDER,
});
