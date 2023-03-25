import "./nav-item.css";

const NavItem = ({ children, text }) => {
  return (
    <li className="nav-item">
      {children}
      <span className="text text_type_main-small">{text}</span>
    </li>
  )
}

export default NavItem;