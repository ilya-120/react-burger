import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredientsElement.module.css";
import { v4 as uuidv4 } from "uuid";
import { elementsPropType } from "../utils/PropTypes";
import Modal from "../Modal/Modal";
import { useState } from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  CONSTRUCTOR_BUNS,
  CONSTRUCTOR_INGREDIENTS,
} from "../../services/actions";

const BurgerIngredientsElement = ({ ingredient }) => {
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const { constructorBuns, constructorIngredients } = useSelector(
    (store) => store.ingredients
  );
  function handleshowModal() {
    setshowModal(!showModal);
    const newIdIngredient = {
      ...ingredient,
      id: ingredient._id,
      _id: uuidv4(),
    };
    if (ingredient.type === "bun")
      dispatch({
        type: CONSTRUCTOR_BUNS,
        payload: ingredient,
      });
    else
      dispatch({
        type: CONSTRUCTOR_INGREDIENTS,
        payload: newIdIngredient,
      });
  }

  const showCountMaterials = () => {
    if (ingredient.name === constructorBuns.name) return 1;
    const id = constructorIngredients.filter(
      (item) => item.id === ingredient._id
    );
    return id.length;
  };

  return (
    <li className={`${Styles.element} mb-8`}>
      <div onClick={handleshowModal}>
        {showCountMaterials() >= 1 ? (
          <Counter size="default" count={showCountMaterials()} />
        ) : (
          ""
        )}
        <img
          className="ml-4 mr-4 mb-1"
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${Styles.currency} mb-1`}>
          <span className="text text_type_digits-default">
            {ingredient.price}
          </span>
          &nbsp;
          <CurrencyIcon />
        </div>
        <span className="text text_type_main-small">{ingredient.name}</span>
      </div>
      {showModal && (
        <Modal title="Детали ингредиента" onClose={handleshowModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </li>
  );
};

BurgerIngredientsElement.propTypes = {
  ingredient: elementsPropType.isRequired,
};

export default BurgerIngredientsElement;
