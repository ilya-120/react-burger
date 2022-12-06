import {
  ERROR_TEXT_GET_INGREDIENTS,
  GET_INGREDIENTS,
} from "../ingredients";
import { getIngredients } from "../../../utils/StellarBurgersApi";
import { AppDispatch, AppThunk } from "../../reducers";

export const getStoreIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  getIngredients()
    .then((res) =>
      res && res.success
        ? dispatch({ type: GET_INGREDIENTS, payload: res.data })
        : dispatch({
          type: ERROR_TEXT_GET_INGREDIENTS,
          payload: "От сервера полученны некорректные данные",
        })
    )
    .catch((err) =>
      dispatch({
        type: ERROR_TEXT_GET_INGREDIENTS,
        payload: `Ошибка загрузки данных: ${err}`,
      })
    );
};
