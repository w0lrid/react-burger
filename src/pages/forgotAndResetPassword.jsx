import styles from './login.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { checkResponse } from '../utils/checkResponse';
import { getCookie } from '../utils/cookies';
import { passwordRecoveryURL, passwordResetURL } from '../config/constants';
import { useForm } from '../hooks/useForm';

const ForgotAndResetPasswordPage = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    email: '',
    newPassword: '',
    token: '',
  });

  const { email, newPassword, token } = values;
  const accessToken = getCookie('accessToken');

  const isForgotPasswordForm = useLocation().pathname.includes('forgot');

  const sendRequestRecoverPassword = (e) => {
    e.preventDefault();
    fetch(passwordRecoveryURL, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
      .then(checkResponse)
      .then(() => {
        navigate('/reset-password', { replace: true });
      });
  };

  const sendRequestResetPassword = (e) => {
    e.preventDefault();
    fetch(passwordResetURL, {
      method: 'POST',
      body: JSON.stringify({ password: newPassword, token }),
    })
      .then(checkResponse)
      .then(() => {
        navigate('/login', { replace: true });
      });
  };

  if (accessToken && accessToken.length > 0) {
    navigate('/', { replace: true });
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
            <EmailInput placeholder="Укажите e-mail" name="email" value={email} onChange={handleChange} />
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </>
        ) : (
          <>
            <PasswordInput
              placeholder="Введите новый пароль"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
            />
            <Input placeholder="Введите код из письма" name="token" value={token} onChange={handleChange} />
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
