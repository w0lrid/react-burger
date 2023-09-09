import commonStyles from "../components/app/app.module.css";
import AppHeader from "../components/app-header/app-header";
import styles from "./login.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { checkResponse } from "../utils/checkResponse";

const ForgotAndResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');

  const isForgotPasswordForm = useLocation().pathname.includes('forgot')

  const sendRequestRecoverPassword = () => {
    fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: "POST",
      body: JSON.stringify({ email })
    })
      .then(checkResponse)
      .then((response) => { console.log(response) })
  }

  const sendRequestResetPassword = () => {
    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: "POST",
      body: JSON.stringify({ password: newPassword, token })
    })
      .then(checkResponse)
      .then((response) => { console.log(response) })
  }

  return (
    <div className={commonStyles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <form className={styles.form}>
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          {isForgotPasswordForm ?
            (
              <>
                <EmailInput placeholder="Укажите e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Button htmlType="button" type="primary" size="medium" onClick={sendRequestRecoverPassword}>Восстановить</Button>
              </>
            ) :
            (
              <>
                <PasswordInput placeholder="Введите новый пароль" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                <Input placeholder="Введите код из письма" value={token} onChange={(event) => setToken(event.target.value)} />
                <Button htmlType="button" type="primary" size="medium" onClick={sendRequestResetPassword}>Сохранить</Button>
              </>
            )}
        </form>
        <div className={styles.actions}>
          <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
            Вспомнили пароль?&nbsp;
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

export default ForgotAndResetPasswordPage