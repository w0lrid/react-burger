import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./app-header.css"
import NavItem from "./nav-item/nav-item";

const AppHeader = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavItem text="Конструктор"><BurgerIcon type="primary" /></NavItem>
        <NavItem text="Лента заказов"><ListIcon type="primary"/></NavItem>
      </nav>
      <div className="logo">
        <Logo />
      </div>
      <nav className="nav">
        <NavItem text="Личный кабинет"><ProfileIcon type="primary" /></NavItem>
      </nav>
    </header>
  )
}

export default AppHeader