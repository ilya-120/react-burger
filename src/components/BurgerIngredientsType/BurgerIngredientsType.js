import React, { forwardRef, useMemo } from "react";
import Styles from "./BurgerIngredientsType.module.css";
import PropTypes from "prop-types";
import BurgerIngredientsElement from "../BurgerIngredientsElement/BurgerIngredientsElement";
import { elementsPropType } from "../../utils/PropTypes";

const BurgerIngredientsType = forwardRef((props, ref) => {
  const ingredientsList = (array) => {
    return array.map((element) => (
      <BurgerIngredientsElement ingredient={element} key={element._id} />
    ));
  };

  const displayIsIngredients = useMemo(
    () => ingredientsList(props.ingredients),
    [props.ingredients]
  );

  return (
    <section>
      <h2 className="text text_type_main-medium mb-6" id={props.ingredient}>
        {props.title}
      </h2>
      <ul className={`${Styles["ingredients-element"]} pl-4 pr-4`} ref={ref}>
        {displayIsIngredients}
      </ul>
    </section>
  );
})

BurgerIngredientsType.propTypes = {
  ingredients: PropTypes.arrayOf(elementsPropType).isRequired,
  ingredient: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BurgerIngredientsType;
