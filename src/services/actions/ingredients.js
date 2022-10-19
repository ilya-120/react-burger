import {
  ERROR_TEXT_GET_INGREDIENTS,
  GET_INGREDIENTS,
  SUCCESS_GET_INGREDIENTS,
} from ".";
import { getIngredients } from "../../components/utils/StellarBurgersApi";

export const getStoreIngredients = () => (dispatch) => {
  getIngredients()
    .then((res) =>
      res && res.success
        ? dispatch({ type: GET_INGREDIENTS, payload: res.data }) &&
          dispatch({ type: SUCCESS_GET_INGREDIENTS })
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
