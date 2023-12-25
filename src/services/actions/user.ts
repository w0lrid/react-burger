import { checkResponse } from '../../utils/checkResponse';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
import { fetchWithRefresh } from '../../utils/fetchWithRefresh';
import { authLoginURL, authLogoutURL, authRegisterURL, authUserURL } from '../../config/constants';
import { TUser } from '../../types/types';
import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from '../constants/user';
import { AppThunk } from '../../types';

export type TUserPayload = {
  success: boolean;
  user: TUser;
};

type TRegisterUser = {
  readonly type: typeof REGISTER_USER;
};

type TRegisterUserSuccess = {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload: TUserPayload;
};

type TRegisterUserFailed = {
  readonly type: typeof REGISTER_USER_FAILED;
};

type TLoginUser = {
  readonly type: typeof LOGIN_USER;
};

type TLoginUserSuccess = {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: TUserPayload;
};

type TLoginUserFailed = {
  readonly type: typeof LOGIN_USER_FAILED;
};

type TLogoutUser = {
  readonly type: typeof LOGOUT_USER;
};

type TLogoutUserSuccess = {
  readonly type: typeof LOGOUT_USER_SUCCESS;
};

type TLogoutUserFailed = {
  readonly type: typeof LOGOUT_USER_FAILED;
};

type TGetUser = {
  readonly type: typeof GET_USER;
};

type TGetUserSuccess = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUserPayload;
};

type TGetUserFailed = {
  readonly type: typeof GET_USER_FAILED;
};

type TUpdateUser = {
  readonly type: typeof UPDATE_USER;
};

type TUpdateUserSuccess = {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUserPayload;
};

type TUpdateUserFailed = {
  readonly type: typeof UPDATE_USER_FAILED;
};

type TUserRegisterActions = TRegisterUser | TRegisterUserSuccess | TRegisterUserFailed;
type TUserLoginActions = TLoginUser | TLoginUserSuccess | TLoginUserFailed;
type TUserLogoutActions = TLogoutUser | TLogoutUserSuccess | TLogoutUserFailed;
type TUserGetActions = TGetUser | TGetUserSuccess | TGetUserFailed;
type TUserUpdateActions = TUpdateUser | TUpdateUserSuccess | TUpdateUserFailed;

export type TUserActions =
  | TUserRegisterActions
  | TUserLoginActions
  | TUserLogoutActions
  | TUserGetActions
  | TUserUpdateActions;

export const registerUser: AppThunk = ({ email, password, name }: TUser) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER,
    });

    fetch(authRegisterURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then(checkResponse)
      .then(({ user, accessToken, refreshToken }) => {
        setCookie('accessToken', accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', refreshToken);

        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: user,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      });
  };
};
export const loginUser: AppThunk = ({ email, password }: Omit<TUser, 'name'>) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER,
    });

    fetch(authLoginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(checkResponse)
      .then(({ user, accessToken, refreshToken }) => {
        setCookie('accessToken', accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', refreshToken);

        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_USER_FAILED,
        });
      });
  };
};
export const logoutUser: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER,
    });

    fetch(authLogoutURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
      .then(checkResponse)
      .then(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch({
          type: LOGOUT_USER_SUCCESS,
          user: null,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_USER_FAILED,
        });
      });
  };
};
export const getUser: AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER,
    });

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${getCookie('accessToken')}`,
      },
    };

    fetchWithRefresh(authUserURL, options)
      .then(({ user }) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: user,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};
export const updateUser: AppThunk = (dataToUpdate) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER,
    });

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${getCookie('accessToken')}`,
      },
      body: JSON.stringify(dataToUpdate),
    };

    fetchWithRefresh(authUserURL, options)
      .then(({ user }) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: user,
        });
      })
      .catch(() => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
};
