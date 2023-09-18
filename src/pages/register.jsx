import commonStyles from "../components/app/app.module.css";
import styles from "./login.module.css";
import AppHeader from "../components/app-header/app-header";
import React, { useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../services/actions/user";
import { getCookie } from "../utils/cookies";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const accessToken = getCookie('accessToken');

  const sendRequestRegister = () => {
    dispatch(registerUser({ email, password, name }))
  }

  if (accessToken.length > 0) {
    return (
      <Navigate to='/' replace/>
    )
  }

  return (
    <div className={commonStyles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <form className={styles.form}>
          <h2 className="text text_type_main-medium">Регистрация</h2>
          <Input placeholder="Имя" value={name} onChange={(event) => setName(event.target.value)} />
          <EmailInput value={email} onChange={(event) => setEmail(event.target.value)} />
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button htmlType="button" type="primary" size="medium" onClick={sendRequestRegister}>Зарегистрироваться</Button>
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