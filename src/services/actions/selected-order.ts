import { TOrder } from '../../types/types';
import { CLOSE_SELECTED_ORDER, SHOW_SELECTED_ORDER } from '../constants/selected-order';

export interface IShowSelectedOrder {
  readonly type: typeof SHOW_SELECTED_ORDER;
  readonly selectedOrder: TOrder;
}

export interface ICloseSelectedOrder {
  readonly type: typeof CLOSE_SELECTED_ORDER;
}

export type TSelectedOrderModalActions = IShowSelectedOrder | ICloseSelectedOrder;

export const showSelectedOrder = (selectedOrder: TOrder): IShowSelectedOrder => ({
  type: SHOW_SELECTED_ORDER,
  selectedOrder,
});

export const closeSelectedOrder = (): ICloseSelectedOrder => ({
  type: CLOSE_SELECTED_ORDER,
});
