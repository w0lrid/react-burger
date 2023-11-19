import styles from './login.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { checkResponse } from '../utils/checkResponse';
import { getCookie } from '../utils/cookies';
import { passwordRecoveryURL, passwordResetURL } from '../config/constants';

const ForgotAndResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const accessToken = getCookie('accessToken');

  const isForgotPasswordForm = useLocation().pathname.includes('forgot');

  const sendRequestRecoverPassword = (e) => {
    e.preventDefault();
    fetch(passwordRecoveryURL, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
      .then(checkResponse)
      .then((response) => {
        console.log(response);
      });
  };

  const sendRequestResetPassword = (e) => {
    e.preventDefault();
    fetch(passwordResetURL, {
      method: 'POST',
      body: JSON.stringify({ password: newPassword, token }),
    })
      .then(checkResponse)
      .then((response) => {
        console.log(response);
      });
  };

  if (accessToken && accessToken.length > 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        onSubmit={isForgotPasswordForm ? sendRequestRecoverPassword : sendRequestResetPassword}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        {isForgotPasswordForm ? (
          <>
            <EmailInput placeholder="Укажите e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </>
        ) : (
          <>
            <PasswordInput
              placeholder="Введите новый пароль"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <Input
              placeholder="Введите код из письма"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
            <Button htmlType="button" type="primary" size="medium">
              Сохранить
            </Button>
          </>
        )}
      </form>
      <div className={styles.actions}>
        <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
          Вспомнили пароль?&nbsp;
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotAndResetPasswordPage;
