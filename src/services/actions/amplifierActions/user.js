import { forgotPassword, getUserInfo, logOut, resetPassword, setUserInfo, signin, signup, updateAccessToken } from "../../../utils/StellarBurgersApi";
import { deleteCookie, setCookie } from "../../../utils/utils";
import {
  ERROR_TEXT_GET_LOGIN_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  ERROR_TEXT_GET_USER_INFO,
  ERROR_TEXT_PATCH_UPDATE_USER,
  ERROR_TEXT_POST_FORGOT_PASSWORD,
  ERROR_TEXT_POST_LOGOUT_USER,
  ERROR_TEXT_POST_RESET_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
  RESET_IS_LOADING,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_INFO_DATA_SUCCESS,
} from "../user";

export const registerRequest = (form, nav, reflectErrorRequest) => (dispatch) => {
  signup(form)
    .then((res) =>
      res && res.success
        ? (dispatch({ type: REGISTER_USER_SUCCESS, payload: res }),
          setCookie("accessToken", res.accessToken),
          localStorage.setItem("refreshToken",
            res.refreshToken),
          nav())
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
          console.log('ok'),
          setCookie("accessToken", res.accessToken),
          localStorage.setItem("refreshToken",
            res.refreshToken))
        : dispatch({
          type: ERROR_TEXT_GET_LOGIN_USER,
          payload: "Ошибка авторизации",
        }),
      reflectErrorRequest()
    )
    .then(() => {
      nav();
    })
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_GET_LOGIN_USER,
          payload: `Ошибка авторизации: ${err.message}`,
        }),
      reflectErrorRequest()
    );
};

export const logoutUserRequest = (reflectErrorRequest) => (dispatch) => {
  logOut()
    .then((res) =>
      res && res.success
        ? (localStorage.removeItem('refreshToken'),
          deleteCookie('accessToken'),
          dispatch({ type: LOGOUT_USER })
        )
        : dispatch({
          type: ERROR_TEXT_POST_LOGOUT_USER,
          payload: "Ошибка выхода",
        }),
      reflectErrorRequest()
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_POST_LOGOUT_USER,
          payload: `Ошибка: ${err.message}`,
        }),
      reflectErrorRequest()
    );
};

export const userRequest = (reflectErrorRequest) => (dispatch) => {
  getUserInfo()
    .then((res) =>
      res && res.success
        ? dispatch({ type: USER_INFO_DATA_SUCCESS, payload: res })
        :
        dispatch({
          type: ERROR_TEXT_GET_USER_INFO,
          payload: "Ошибка получения данных",
        }),
      reflectErrorRequest()
    )
    .catch(
      async (err) =>
        err.message === 'jwt expired' ?
          (await updateAccessToken(),
            getUserInfo())
          :
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
        : dispatch({
          type: ERROR_TEXT_PATCH_UPDATE_USER,
          payload: "Ошибка обновления данных",
        }),
      reflectErrorRequest())
    .catch(
      async (err) =>
        err.message === 'jwt expired' ?
          (await updateAccessToken(),
            await setUserInfo(form),
            dispatch({ type: RESET_IS_LOADING })
          )
          :
          dispatch({
            type: ERROR_TEXT_PATCH_UPDATE_USER,
            payload: `Ошибка обновления данных: ${err.message}`,
          }),
      reflectErrorRequest())
    ;
};

export const forgotPasswordRequest = (form, nav, reflectErrorRequest) => (dispatch) => {
  forgotPassword(form)
    .then((res) =>
      res && res.success
        ? (dispatch({ type: FORGOT_PASSWORD_SUCCESS }),
          nav())
        : dispatch({
          type: ERROR_TEXT_POST_FORGOT_PASSWORD,
          payload: "Ошибка",
        }),
      reflectErrorRequest()
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_POST_FORGOT_PASSWORD,
          payload: `Ошибка: ${err.message}`,
        }),
      reflectErrorRequest()
    );
};

export const resetPasswordRequest = (form, nav, reflectErrorRequest) => (dispatch) => {
  resetPassword(form)
    .then((res) =>
      res && res.success
        ? (dispatch({ type: RESET_PASSWORD_SUCCESS }),
          nav())
        : dispatch({
          type: ERROR_TEXT_POST_RESET_PASSWORD,
          payload: "Ошибка",
        }),
      reflectErrorRequest()
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_POST_RESET_PASSWORD,
          payload: `Ошибка: ${err.message}`,
        }),
      reflectErrorRequest()
    );
};
