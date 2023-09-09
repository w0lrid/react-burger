import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css"
import NavItem from "./nav-item/nav-item";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const AppHeader = () => {
  const [linkActive, setLinkActive] = useState({
    constructor: false,
    orders: false,
    profile: false,
  });

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavItem text="Конструктор">
          <BurgerIcon type="primary"/>
        </NavItem>
        <NavItem text="Лента заказов">
          <ListIcon type="primary"/>
        </NavItem>
      </nav>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to={{ pathname: `/profile` }}
          className={({ isActive }) => `${styles['nav-link']} ${isActive && styles['nav-link__active']}`}
        >
          {({ isActive }) => (
            <NavItem text="Личный кабинет">
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
            </NavItem>
          )}
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader