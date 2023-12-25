import styles from './login.module.css';
import React, { FormEvent, FormEventHandler, useMemo } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { loginUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookies';
import { useForm } from '../../hooks/useForm';
import { getUserFromStore } from '../../services/selectors/order';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });
  const { user } = useSelector(getUserFromStore);

  const { email, password } = values;
  const accessToken = useMemo(() => getCookie('accessToken'), [user]);

  const sendRequestLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {accessToken && accessToken.length > 0 ? (
        <Navigate to="/" replace />
      ) : (
        <main className={styles.main}>
          <form className={styles.form} onSubmit={sendRequestLogin}>
            <h2 className="text text_type_main-medium">Вход</h2>
            <EmailInput name="email" value={email} onChange={handleChange} />
            <PasswordInput name="password" value={password} onChange={handleChange} />
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
      )}
    </>
  );
};

export default LoginPage;
