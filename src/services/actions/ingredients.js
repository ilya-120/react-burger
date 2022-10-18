import { GET_INGREDIENTS } from ".";
import { getIngredients } from "../../components/utils/StellarBurgersApi";

export const getStoreIngredients = () => (dispatch) => {
  getIngredients()
    .then(
      (res) => dispatch({ type: GET_INGREDIENTS, payload: res.data })
    )
    .catch((err) => console.log("err:"`${err}`));
};
