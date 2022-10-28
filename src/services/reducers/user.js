import {
  ERROR_GET_REGISTER_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  REGISTER_USER_SUCCESS,
} from "../actions/user";

const initialState = {
  success: false,
  error: false,
  errorText: "",
  userInfo: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        success: true,
      };
    case ERROR_TEXT_GET_REGISTER_USER:
      return {
        ...state,
        errorText: action.payload,
      };
    case ERROR_GET_REGISTER_USER:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
