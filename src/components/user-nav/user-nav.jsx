import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import styles from './user-nav.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions/user';

export const UserNav = ({ pageDescription }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sendRequestLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <section className={styles['nav-section']}>
      <nav>
        <ul className={styles.nav}>
          <li className={`${styles['nav-item']} text text_type_main-medium`}>
            <NavLink
              to={{ pathname: `/profile` }}
              className={({ isActive }) =>
                `${styles['nav-link']} ${
                  !location.pathname.includes('profile/orders') &&
                  location.pathname.includes('profile') &&
                  styles['nav-link__active']
                }`
              }
            >
              Профиль
            </NavLink>
          </li>
          <li className={`${styles['nav-item']} text text_type_main-medium`}>
            <NavLink
              to={{ pathname: `/profile/orders` }}
              className={({ isActive }) =>
                `${styles['nav-link']} ${location.pathname.includes('profile/orders') && styles['nav-link__active']}`
              }
            >
              История заказов
            </NavLink>
          </li>
          <li className={`${styles['nav-item']} text text_type_main-medium`} onClick={sendRequestLogout}>
            <NavLink to={{ pathname: `/` }} className={styles['nav-link']}>
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
      <p className="text text_type_main-default text_color_inactive">{pageDescription}</p>
    </section>
  );
};
