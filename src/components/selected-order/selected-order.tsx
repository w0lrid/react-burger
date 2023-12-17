import React, { useEffect } from 'react';
import styles from './selected-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { includesIngredients, filterIngredients, getOrderDate, calculatePrice } from '../../utils/utils';
import { wsConnectionStart } from '../../services/actions/feed-socket';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedOrder } from '../../services/actions/order';
import { userWsConnectionStart } from '../../services/actions/user-feed-socket';
import { getCookie } from '../../utils/cookies';
import { TStore } from '../../types/types';

const SelectedOrder = () => {
  const { number: numberFromParams } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');

    dispatch(wsConnectionStart());

    if (token) {
      dispatch(userWsConnectionStart(token));
    }
  }, []);

  const order = useSelector((state: TStore) => {
    let order = state.feed.orders.find((order) => order.number === Number(numberFromParams));

    if (order) {
      return order;
    }

    order = state.userFeed.orders.find((order) => order.number === Number(numberFromParams));

    if (order) {
      return order;
    }

    return state.order.selectedOrder;
  });

  useEffect(() => {
    if (!order) {
      // @ts-ignore
      dispatch(getSelectedOrder(numberFromParams));
    }
  }, [order]);

  const { ingredients } = useSelector((state: TStore) => state.ingredients);

  if (!order) {
    return null;
  }

  return (
    <main className={styles.card}>
      {order && (
        <>
          <h5 className={`${styles.header} ${styles.id} text text_type_digits-default`}>#{order.number}</h5>
          <span className={`${styles.name} text text_type_main-medium mt-10`}>{order.name}</span>
          <span className={`${styles.status} text text_type_main-default mt-3`}>
            {order.status === 'done' ? `Выполнен` : `Готовится`}
          </span>
          <span className={`${styles.subtitle} text text_type_main-medium  mt-15`}>Cостав:</span>
          <ul className={styles.scroll}>
            {ingredients &&
              includesIngredients(ingredients, order.ingredients).map((element) => {
                return (
                  <li className={styles.ingredient} key={element._id}>
                    <img className={styles.image} src={element.image_mobile} alt={element.name} />
                    <span className={`${styles.name} text text_type_main-small ml-2`}>{element.name}</span>
                    <span className={`${styles.price} text text_type_digits-default`}>
                      {filterIngredients(order.ingredients, ingredients).filter((i) => i._id === element._id).length}x
                      {element.price} <CurrencyIcon type="primary" />
                    </span>
                  </li>
                );
              })}
          </ul>
          <p className={`${styles.container} mb-6`}>
            <span className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>
              {getOrderDate(order.createdAt)}
            </span>
            <span className={`${styles.total} text text_type_digits-default ml-2`}>
              {calculatePrice(order.ingredients, ingredients)}
              <CurrencyIcon type="primary" />
            </span>
          </p>
        </>
      )}
    </main>
  );
};

export default SelectedOrder;
