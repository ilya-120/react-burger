import { FC } from "react";
import Styles from "./OrderIngredient.module.css";
import { TIngredient } from "../../../utils/typeData";
import OrderPrice from "../../OrderCardIngredients/OrderPrice/OrderPrice";
import { constants } from "../../../utils/data";

type TOrderIngredient = {
  ingredient: TIngredient;
  quantity: number;
};

const OrderIngredient: FC<TOrderIngredient> = ({ ingredient, quantity }) => {
  const ingredientPrice =
    ingredient.type === constants.bun
      ? `2 x ${ingredient.price}`
      : `${quantity} x ${ingredient.price}`;

  return (
    <section className={Styles.section}>
      <div className={Styles.div}>
        <img
          className={`mr-4 ${Styles.img}`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <span
          className={`text text_type_main-default mr-4`}
        >
          {ingredient.name}
        </span>
      </div>
      <div className={Styles.div}>
        <OrderPrice price={ingredientPrice} />
      </div>
    </section>
  );
};

export default OrderIngredient;
