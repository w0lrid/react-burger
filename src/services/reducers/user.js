import {
  LOGIN_USER, LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS
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
        orderRequest: true,
        orderFailed: false,
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
        orderRequest: true,
        orderFailed: false,
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
    default: {
      return state
    }
  }
}