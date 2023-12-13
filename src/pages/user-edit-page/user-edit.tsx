import styles from './user-edit.module.css';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../services/actions/user';
import { UserNav } from '../../components/user-nav/user-nav';

const UserEdit = () => {
  const dispatch = useDispatch();

  const [disabledNameInput, setDisabledNameInput] = useState(true);

  const updateUserInfo = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(updateUser());
  };

  return (
    <main className={styles.main}>
      <UserNav pageDescription="В этом разделе вы можете изменить свои персональные данные" />
      <form className={styles.form} onSubmit={updateUserInfo}>
        <Input
          placeholder="Имя"
          value={'test'}
          onChange={(event) => {}}
          disabled={disabledNameInput}
          icon="EditIcon"
          onIconClick={() => setDisabledNameInput((prevState) => !prevState)}
        />
        <EmailInput value={'email'} onChange={(event) => {}} isIcon />
        <PasswordInput value={'password'} onChange={(event) => {}} icon="EditIcon" />
      </form>
    </main>
  );
};

export default UserEdit;
