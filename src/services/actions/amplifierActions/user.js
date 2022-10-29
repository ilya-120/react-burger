import { signin, signup } from "../../../utils/StellarBurgersApi";
import { setCookie } from "../../../utils/utils";
import {
  ERROR_TEXT_GET_LOGIN_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from "../user";

export const registerRequest = (form, nav, reflectErrorRequest) => (dispatch) => {
  signup(form)
    .then((res) =>
      res && res.success
        ? (dispatch({ type: REGISTER_USER_SUCCESS, payload: res }),
          setCookie("accessToken", res.accessToken), nav())
        : (dispatch({
          type: ERROR_TEXT_GET_REGISTER_USER,
          payload: "Ошибка регистрации",
        }),
          reflectErrorRequest())
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_GET_REGISTER_USER,
          payload: `Ошибка регистрация: ${err.message}`,
        }),
      reflectErrorRequest()
    );
};

export const loginRequest = (form, nav, reflectErrorRequest) => (dispatch) => {
  signin(form)
    .then((res) =>
      res && res.success
        ? (dispatch({ type: LOGIN_USER_SUCCESS, payload: res }),
          setCookie("accessToken", res.accessToken), nav())
        : dispatch({
          type: ERROR_TEXT_GET_LOGIN_USER,
          payload: "Ошибка авторизации",
        }),
      reflectErrorRequest()
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_GET_LOGIN_USER,
          payload: `Ошибка авторизации: ${err.message}`,
        }),
      reflectErrorRequest()
    );
};
