import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css"
import NavItem from "./nav-item/nav-item";

const AppHeader = () => {
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
        <NavItem text="Личный кабинет">
          <ProfileIcon type="primary"/>
        </NavItem>
      </nav>
    </header>
  )
}

export default AppHeader