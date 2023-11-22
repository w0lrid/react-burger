import styles from './login.module.css';
import React, { useState } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/actions/user';
import { getCookie } from '../utils/cookies';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const accessToken = getCookie('accessToken');

  const sendRequestLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (accessToken?.length > 0) {
    navigate('/', { replace: true });
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={sendRequestLogin}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput value={email} onChange={(event) => setEmail(event.target.value)} />
        <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.actions}>
        <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
          Вы - новый пользователь?&nbsp;
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
          Забыли пароль?&nbsp;
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
