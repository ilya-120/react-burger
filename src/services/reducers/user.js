import {
  ERROR_TEXT_GET_LOGIN_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  ERROR_TEXT_GET_USER_INFO,
  IS_LOADING,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  RESET_ERROR,
  USER_INFO_DATA_SUCCESS,
} from "../actions/user";

const initialState = {
  success: false,
  errorText: "",
  userInfo: {},
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
      case USER_INFO_DATA_SUCCESS:
        return {
          ...state,
          userInfo: action.payload,
          success: true,
          isLoading: false,
          isLogin: true,
        };
      case ERROR_TEXT_GET_USER_INFO:
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
