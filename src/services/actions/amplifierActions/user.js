import { getUserInfo, setUserInfo, signin, signup } from "../../../utils/StellarBurgersApi";
import { setCookie } from "../../../utils/utils";
import {
  ERROR_TEXT_GET_LOGIN_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  ERROR_TEXT_GET_USER_INFO,
  ERROR_TEXT_PATCH_UPDATE_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_INFO_DATA_SUCCESS,
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
          payload: `Ошибка регистрации: ${err.message}`,
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

export const userRequest = (reflectErrorRequest) => (dispatch) => {
  getUserInfo()
    .then((res) =>
      res && res.success
        ? dispatch({ type: USER_INFO_DATA_SUCCESS, payload: res })
        : dispatch({
          type: ERROR_TEXT_GET_USER_INFO,
          payload: "Ошибка получения данных",
        }),
      reflectErrorRequest()
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_GET_USER_INFO,
          payload: `Ошибка получения данных: ${err.message}`,
        }),
      reflectErrorRequest()
    )
};

export const udateUserRequest = (form, reflectErrorRequest) => (dispatch) => {
  setUserInfo(form)
    .then((res) =>
      res && res.success
        ? dispatch({ type: UPDATE_USER_SUCCESS, payload: res })
        : (dispatch({
          type: ERROR_TEXT_PATCH_UPDATE_USER,
          payload: "Ошибка обновления данных",
        }),
          reflectErrorRequest())
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_PATCH_UPDATE_USER,
          payload: `Ошибка обновления данных: ${err.message}`,
        }),
      reflectErrorRequest()
    );
};
