import styles from "./nav-item.module.css";

const NavItem = ({ children, text }) => {
  return (
    <li className={styles["nav-item"]}>
      {children}
      <span className="text text_type_main-small">{text}</span>
    </li>
  )
}

export default NavItem;