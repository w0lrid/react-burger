import commonStyles from "../components/app/app.module.css";
import styles from "./login.module.css";
import AppHeader from "../components/app-header/app-header";
import React from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className={commonStyles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <form className={styles.form}>
          <h2 className="text text_type_main-medium">Регистрация</h2>
          <Input placeholder="Имя" />
          <EmailInput />
          <PasswordInput value="" onChange={() => console.log('on change')} />
          <Button htmlType="button" type="primary" size="medium">Зарегистрироваться</Button>
        </form>
        <div className={styles.actions}>
          <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
            Уже зарегистированы?&nbsp;
            <Link
              to="/login"
              className={styles.link}
            >
              Войти
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage;