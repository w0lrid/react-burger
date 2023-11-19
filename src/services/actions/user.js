import { checkResponse } from '../../utils/checkResponse';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
import { fetchWithRefresh } from '../../utils/fetchWithRefresh';
import { authLoginURL, authLogoutURL, authRegisterURL, authUserURL } from '../../config/constants';

// REGISTER
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

// LOGIN
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

// LOGOUT
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

// PROFILE
export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const registerUser = ({ email, password, name }) => {
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
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      });
  };
};
export const loginUser = ({ email, password }) => {
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
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_USER_FAILED,
        });
      });
  };
};
export const logoutUser = () => {
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
      .then(({ user }) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');

        dispatch({
          type: LOGOUT_USER_SUCCESS,
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_USER_FAILED,
        });
      });
  };
};
export const getUser = () => {
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
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};

export const updateUser = (dataToUpdate) => {
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
          user,
        });
      })
      .catch(() => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
};
