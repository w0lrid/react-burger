import { FC, ReactNode } from 'react';
import styles from './nav-item.module.css';

type TNavItem = {
  children: ReactNode;
  text: string;
};

const NavItem: FC<TNavItem> = ({ children, text }) => {
  return (
    <li className={styles['nav-item']}>
      {children}
      <span className="text text_type_main-small">{text}</span>
    </li>
  );
};

export default NavItem;
