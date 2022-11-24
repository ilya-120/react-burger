import { forwardRef, useMemo } from "react";
import Styles from "./BurgerIngredientsType.module.css";
import BurgerIngredientsElement from "../BurgerIngredientsElement/BurgerIngredientsElement";
import { TIngredient } from "../../utils/typeData";

export type TRef<T> = {
  title: string;
  ingredients: T[];
  ingredient: string;
};

const BurgerIngredientsType = forwardRef<HTMLUListElement, TRef<TIngredient>>(
  ({ ingredients, ingredient, title }, ref) => {
    const ingredientsList = (array: Array<TIngredient>) => {
      return array.map((element: TIngredient) => (
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
        <ul className={`${Styles["ingredients-element"]} pl-4 pr-4`} ref={ref}>
          {displayIsIngredients}
        </ul>
      </section>
    );
  }
);

export default BurgerIngredientsType;
