import styles from './login.module.css';
import React from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../services/actions/user';
import { getCookie } from '../utils/cookies';
import { useForm } from '../hooks/useForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = values;
  const accessToken = getCookie('accessToken');

  const sendRequestRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }));
  };

  if (accessToken && accessToken.length > 0) {
    navigate('/', { replace: true });
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={sendRequestRegister}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input placeholder="Имя" name="name" value={name} onChange={handleChange} />
        <EmailInput name="email" value={email} onChange={handleChange} />
        <PasswordInput name="password" value={password} onChange={handleChange} />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.actions}>
        <p className={`text text_type_main-default text_color_inactive ${styles.action}`}>
          Уже зарегистированы?&nbsp;
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
