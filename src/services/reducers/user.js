import {
  ERROR_TEXT_GET_LOGIN_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  IS_LOADING,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  RESET_ERROR,
} from "../actions/user";

const initialState = {
  success: false,
  errorText: "",
  userInfo: null,
  isLoading: null,
  isLogin: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        success: true,
        isLoading: false,
        isLogin: true,
      };
    case ERROR_TEXT_GET_REGISTER_USER:
      return {
        ...state,
        errorText: action.payload,
        isLoading: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        success: true,
        isLoading: false,
        isLogin: true,
      };
    case ERROR_TEXT_GET_LOGIN_USER:
      return {
        ...state,
        errorText: action.payload,
        isLoading: false,
      };
    case RESET_ERROR:
      return {
        ...state,
        errorText: '',
        success: false,
        isLoading: false,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
