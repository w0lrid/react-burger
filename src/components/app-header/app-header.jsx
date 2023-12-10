import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavItem from './nav-item/nav-item';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const AppHeader = () => {
  const [linkActive, setLinkActive] = useState({
    constructor: false,
    orders: false,
    profile: false,
  });

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to={{ pathname: '/' }}
          className={({ isActive }) => `${styles['nav-link']} ${isActive && styles['nav-link__active']}`}
        >
          {({ isActive }) => (
            <NavItem text="Конструктор">
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
            </NavItem>
          )}
        </NavLink>
        <NavLink
          to={{ pathname: '/feed' }}
          className={({ isActive }) => `${styles['nav-link']} ${isActive && styles['nav-link__active']}`}
        >
          {({ isActive }) => (
            <NavItem text="Лента заказов">
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
            </NavItem>
          )}
        </NavLink>
      </nav>
      <div className={styles.logo}>
        <NavLink to={{ pathname: '/' }}>
          <Logo />
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to={{ pathname: `/profile` }}
          className={({ isActive }) => `${styles['nav-link']} ${isActive && styles['nav-link__active']}`}
        >
          {({ isActive }) => (
            <NavItem text="Личный кабинет">
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            </NavItem>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
