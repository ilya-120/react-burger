import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredientsElement.module.css";
import { elementsPropType } from "../utils/PropTypes";
import Modal from "../Modal/Modal";
import { useState } from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const BurgerIngredientsElement = ({ ingredient }) => {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  return (
    <li className={`${Styles.element} mb-8`}>
      <div onClick={handleShow}>
        {ingredient.count >= 1 ? (
          <Counter size="default" count={ingredient.count} />
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
      {show && (
        <Modal title="Детали ингредиента" onClose={handleShow} isOpen={show}>
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
