import React, { useEffect } from 'react';
import { UserNav } from '../components/user-nav/user-nav';
import styles from './userFeed.module.css';
import { userWsConnectionStart, userWsConnectionClosed } from '../services/actions/user-feed-socket';
import { getCookie } from '../utils/cookies';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserOrderCard } from '../components/user-order-card/user-order-card';

const UserFeedPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');

    dispatch(userWsConnectionStart(token));
  }, []);

  useEffect(() => {
    if (!location.pathname.includes('/profile/orders')) {
      dispatch(userWsConnectionClosed());
    }
  }, [location, dispatch]);

  const { orders } = useSelector((state) => state.userFeed);

  return (
    orders && (
      <main className={styles.main}>
        <UserNav pageDescription="В этом разделе вы можете просмотреть свою историю заказов" />
        <section className={styles.section}>
          <div className={`${styles.scroll} mt-10`}>
            {orders.map((order) => (
              <UserOrderCard order={order} key={order._id} />
            ))}
          </div>
        </section>
      </main>
    )
  );
};

export default UserFeedPage;
