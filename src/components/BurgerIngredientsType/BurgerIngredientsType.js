import { useMemo } from "react";
import Styles from "./BurgerIngredientsType.module.css";
import PropTypes from "prop-types";
import BurgerIngredientsElement from "../BurgerIngredientsElement/BurgerIngredientsElement";
import { elementsPropType } from "../../utils/PropTypes";

function BurgerIngredientsType({ ingredients, ingredient, title, forwardedRef }) {
  const ingredientsList = (array) => {
    return array.map((element) => (
      <BurgerIngredientsElement ingredient={element} key={element._id} />
    ));
  };

  const displayIsIngredients = useMemo(
    () => ingredientsList(ingredients),
    [ingredients]
  );

  return (
    <section>
      <h2 className="text text_type_main-medium mb-6" id={ingredient}>
        {title}
      </h2>
      <ul className={`${Styles["ingredients-element"]} pl-4 pr-4`} ref={forwardedRef}>
        {displayIsIngredients}
      </ul>
    </section>
  );
}

BurgerIngredientsType.propTypes = {
  ingredients: PropTypes.arrayOf(elementsPropType).isRequired,
  ingredient: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  forwardedRef: PropTypes.object.isRequired,
};

export default BurgerIngredientsType;
