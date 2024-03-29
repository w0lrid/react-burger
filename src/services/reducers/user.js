import {
  GET_USER, GET_USER_FAILED, GET_USER_SUCCESS,
  LOGIN_USER, LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS, UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS
} from "../actions/user";

const initialState = {
  userRequest: false,
  userFailed: false,
  user: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        user: action.user,
      }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      }
    }
    case LOGIN_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        user: action.user,
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      }
    }
    case GET_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        user: action.user,
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      }
    }
    case UPDATE_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        user: action.user,
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      }
    }
    default: {
      return state
    }
  }
}