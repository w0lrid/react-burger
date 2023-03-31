import styles from "./nav-item.module.css";
import PropTypes from "prop-types";

const NavItem = ({ children, text }) => {
  return (
    <li className={styles["nav-item"]}>
      {children}
      <span className="text text_type_main-small">{text}</span>
    </li>
  )
}

NavItem.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
}

export default NavItem;