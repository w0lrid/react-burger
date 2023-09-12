import commonStyles from "../components/app/app.module.css";
import styles from "./login.module.css";
import AppHeader from "../components/app-header/app-header";
import React, { useState } from "react";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/actions/user";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendRequestLogin = () => {
    dispatch(loginUser({ email, password }));
  }

  return (
    <div className={commonStyles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <form className={styles.form}>
          <h2 className="text text_type_main-medium">Вход</h2>
          <EmailInput value={email} onChange={(event) => setEmail(event.target.value)} />
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button htmlType="button" type="primary" size="medium" onClick={sendRequestLogin}>Войти</Button>
        </form>
        <div className={styles.actions}>
          <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
            Вы - новый пользователь?&nbsp;
            <Link
              to="/register"
              className={styles.link}
            >
              Зарегистрироваться
            </Link>
          </p>
          <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
            Забыли пароль?&nbsp;
            <Link
              to="/forgot-password"
              className={styles.link}
            >
              Восстановить пароль
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default LoginPage;