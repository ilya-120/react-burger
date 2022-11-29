import {
  ERROR_TEXT_GET_ORDER_NUMBER,
  GET_ORDER_NUMBER,
  SUCCESS_GET_ORDER_NUMBER,
} from "../orders";
import { getOrderNumber } from "../../../utils/StellarBurgersApi";
import { AppDispatch, AppThunk } from "../../reducers";

export const getStoreOrderNumber: AppThunk =
  (object: string[]) => (dispatch: AppDispatch) => {
    getOrderNumber(object)
      .then((data) =>
        data
          ? dispatch({ type: GET_ORDER_NUMBER, payload: data }) &&
            dispatch({ type: SUCCESS_GET_ORDER_NUMBER })
          : dispatch({
              type: ERROR_TEXT_GET_ORDER_NUMBER,
              payload: "От сервера полученны некорректные данные",
            })
      )
      .catch((err) =>
        dispatch({
          type: ERROR_TEXT_GET_ORDER_NUMBER,
          payload: `Ошибка загрузки данных: ${err}`,
        })
      );
  };
