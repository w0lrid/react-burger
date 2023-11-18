import React, { useEffect } from 'react';
import styles from './feed.module.css';
import { useLocation } from 'react-router-dom';
import { OrderCard } from '../components/order-card/order-card';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionClosed, wsConnectionStart } from '../services/actions/feed-socket';

const FeedPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => {};
  }, []);

  useEffect(() => {
    if (location.pathname !== '/feed') {
      dispatch(wsConnectionClosed());
    }
  }, [location, dispatch]);

  return (
    orders && (
      <main className={styles.main}>
        <section className={`${styles.feed} mt-10`}>
          <p className={`text text_type_main-large  ${styles.title} mb-6 ml-2`}>Лента заказов</p>
          <div className={styles.scroll}>
            {orders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })}
          </div>
        </section>
        <section className={`${styles.board} mt-15`}>
          <div className={styles.orders}>
            <div className={styles.box}>
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <div className={styles.container}>
                <ul className={styles.done}>
                  {orders.map((item, index) => {
                    if (item.status === 'done' && index < 10)
                      return (
                        <li key={item._id} className={`${styles.doneId} text text_type_digits-default`}>
                          {item.number}
                        </li>
                      );
                  })}
                </ul>
                <ul className={styles.done}>
                  {orders.map((item, index) => {
                    if (item.status === 'done' && index < 20 && index >= 10)
                      return (
                        <li key={item._id} className={`${styles.doneId} text text_type_digits-default ml-2`}>
                          {item.number}
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.work}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              {orders.map((item, index) => {
                if (item.status !== 'done' && index < 10)
                  return (
                    <li key={item._id} className={`${styles.workId} text text_type_digits-default`}>
                      {item.number}
                    </li>
                  );
              })}
            </div>
          </div>
          <li className={styles.completed}>
            <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
            <p className={`${styles.text} text text_type_digits-large`}>{total}</p>
          </li>
          <li className={styles.completed}>
            <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
            <p className={`${styles.text} text text_type_digits-large`}>{totalToday}</p>
          </li>
        </section>
      </main>
    )
  );
};

export default FeedPage;
