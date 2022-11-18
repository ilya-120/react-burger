import {
  ERROR_GET_ORDER_NUMBER,
  ERROR_TEXT_GET_ORDER_NUMBER,
  GET_ORDER_NUMBER,
  SUCCESS_GET_ORDER_NUMBER,
} from "../orders";
import { getOrderNumber } from "../../../utils/StellarBurgersApi";
import { Dispatch } from "redux";

export const getStoreOrderNumber = (object: string[]) => (dispatch: Dispatch) => {
  getOrderNumber(object)
    .then((data) =>
      data && data.success
        ? dispatch({ type: GET_ORDER_NUMBER, payload: data.order.number }) &&
          dispatch({ type: SUCCESS_GET_ORDER_NUMBER })
        : dispatch({
            type: ERROR_TEXT_GET_ORDER_NUMBER,
            payload: "От сервера полученны некорректные данные",
          }) &&
          dispatch({
            type: ERROR_GET_ORDER_NUMBER,
          })
    )
    .catch(
      (err) =>
        dispatch({
          type: ERROR_TEXT_GET_ORDER_NUMBER,
          payload: `Ошибка загрузки данных: ${err}`,
        }) &&
        dispatch({
          type: ERROR_GET_ORDER_NUMBER,
        })
    );
};
