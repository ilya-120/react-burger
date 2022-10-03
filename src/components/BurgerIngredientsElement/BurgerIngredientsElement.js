import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredientsElement.module.css";
import PropTypes from "prop-types";
//import { elementsPropType } from "../utils/PropTypes";

const BurgerIngredientsElement = ({ ingredient }) => {
  return (
    <li className={`${Styles.element} mb-8`}>
      <div>
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
    </li>
  );
};

//BurgerIngredientsElement.propTypes = {elementsPropType}.isRequired
//возможно правильный вариант, но не уверен, оставил тут пока так.

BurgerIngredientsElement.propTypes = {
  ingredient: PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    __v: PropTypes.number,
    _id: PropTypes.string.isRequired,
  }),
};

export default BurgerIngredientsElement;
