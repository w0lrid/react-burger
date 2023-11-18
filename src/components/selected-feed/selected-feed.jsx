import React, { useEffect } from 'react';
import styles from './selected-feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { includesIngredients, filterIngredients, getOrderDate, calculatePrice } from '../../utils/utils';
import { wsConnectionStart } from '../../services/actions/socket';
import { useDispatch, useSelector } from 'react-redux';

const SelectedFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());
  }, []);

  const { orders: data } = useSelector((state) => state.socket);
  const { ingredients } = useSelector((state) => state.ingredients);

  const { number } = useParams();

  const order = React.useMemo(() => data.find((item) => item.number == number), [data, number]);

  return (
    <main className={styles.card}>
      <h5 className={`${styles.header} ${styles.id} text text_type_digits-default`}>#{order?.number}</h5>
      <span className={`${styles.name} text text_type_main-medium mt-10`}>{order?.name}</span>
      <span className={`${styles.status} text text_type_main-default mt-3`}>
        {order?.status === 'done' ? `Выполнен` : `Готовится`}
      </span>
      <span className={`${styles.subtitle} text text_type_main-medium  mt-15`}>Cостав:</span>
      <ul className={styles.scroll}>
        {order &&
          ingredients &&
          includesIngredients(ingredients, order?.ingredients).map((element) => {
            return (
              <li className={styles.ingredient} key={element._id}>
                <img className={styles.image} src={element.image_mobile} alt={element.name} />
                <p className={`${styles.name} text text_type_main-small ml-2`}>{element.name}</p>
                <p className={`${styles.price} text text_type_digits-default`}>
                  {filterIngredients(order.ingredients, ingredients).filter((i) => i._id === element._id).length}x
                  {element.price} <CurrencyIcon type="primary" />
                </p>
              </li>
            );
          })}
      </ul>
      <div className={`${styles.container} mb-6`}>
        {order && (
          <p className={`${styles.timestamp} text text_type_main-default text_color_inactive`}>
            {getOrderDate(order.createdAt)}
          </p>
        )}
        {order && (
          <p className={`${styles.total} text text_type_digits-default ml-2`}>
            {calculatePrice(order.ingredients, ingredients)}
            <CurrencyIcon type="primary" />
          </p>
        )}
      </div>
    </main>
  );
};

export default SelectedFeed;
