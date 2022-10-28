import { signup } from "../../../utils/StellarBurgersApi";
import {
  ERROR_GET_REGISTER_USER,
  ERROR_TEXT_GET_REGISTER_USER,
  REGISTER_USER_SUCCESS,
} from "../user";

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export const registerRequest = (form) => (dispatch) => {
  signup(form)
    .then((res) =>
      res && res.success
        ? dispatch({ type: REGISTER_USER_SUCCESS, payload: res }) &&
          setCookie("accessToken", res.accessToken)
        : dispatch({
            type: ERROR_TEXT_GET_REGISTER_USER,
            payload: "Ошибка регистрация",
          }) &&
          dispatch({
            type: ERROR_GET_REGISTER_USER,
          })
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_GET_REGISTER_USER,
          payload: `Ошибка регистрация: ${err.message}`,
        }) &&
        dispatch({
          type: ERROR_GET_REGISTER_USER,
        })
    );
};
