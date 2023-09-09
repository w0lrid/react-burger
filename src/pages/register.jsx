import commonStyles from "../components/app/app.module.css";
import styles from "./login.module.css";
import AppHeader from "../components/app-header/app-header";
import React, { useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { checkResponse } from "../utils/checkResponse";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendRequestRegister = () => {
    fetch('https://norma.nomoreparties.space/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email, password, name })
    }).then(checkResponse).then((response) => { console.log(response) })
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