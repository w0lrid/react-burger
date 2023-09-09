import commonStyles from "../components/app/app.module.css";
import styles from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const Profile = () => {
    const [disabledNameInput, setDisabledNameInput] = useState(true);
    return (
        <div className={commonStyles.app}>
            <AppHeader />
            <main className={styles.main}>
                <section className={styles['nav-section']}>
                    <nav>
                        <ul className={styles.nav}>
                            <li className={`${styles['nav-item']} text text_type_main-medium`}>
                                <NavLink
                                    to={{ pathname: `/profile`}}
                                    className={({ isActive }) => `${styles['nav-link']} ${isActive && styles['nav-link__active']}`}
                                >
                                    Профиль
                                </NavLink>
                            </li>
                            <li className={`${styles['nav-item']} text text_type_main-medium`}>
                                <NavLink
                                    to={{ pathname: `/profile/orders` }}
                                    className={({ isActive }) => `${styles['nav-link']} ${isActive && styles['nav-link__active']}`}
                                >
                                    История заказов
                                </NavLink>
                            </li>
                            <li className={`${styles['nav-item']} text text_type_main-medium`}>
                                <NavLink
                                    to={{ pathname: `/profile/orders/:id` }}
                                    className={({ isActive }) => `${styles['nav-link']} ${isActive && styles['nav-link__active']}`}
                                >
                                    Выход
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
                </section>
                <form className={styles.form}>
                    <Input placeholder="Имя" value={'test'} onChange={(event) => {}} disabled={disabledNameInput} icon="EditIcon" onIconClick={() => setDisabledNameInput((prevState) => !prevState)} />
                    <EmailInput value={'email'} onChange={(event) => {}} isIcon />
                    <PasswordInput value={'password'} onChange={(event) => {}} icon="EditIcon" />
                </form>
            </main>
        </div>
    )
}

export default Profile