import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";

function BurgerConstructor({ ingredients }) {
  const burgerComponentInside = ingredients.filter(
    (element) => element.type !== "bun"
  );
  const burgerComponentOutside = ingredients.filter(
    (element) => element.type === "bun"
  );

  return (
    <section className={`${Styles["section-constructor"]}`}>
      <div className={`${Styles.div} pt-25 pb-2 ml-3`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${burgerComponentOutside[0].name} (верх)`}
          price={burgerComponentOutside[0].price}
          thumbnail={burgerComponentOutside[0].image}
        />
      </div>
      <ul className={`${Styles.list} custom-scroll`}>
        {burgerComponentInside.map((element) => (
          <li key={element._id} className={`${Styles["list-element"]}`}>
            <DragIcon />
            <div className={`${Styles.div} ml-2 mr-2`}>
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${Styles.div} ml-3`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${burgerComponentOutside[0].name} (низ)`}
          price={burgerComponentOutside[0].price}
          thumbnail={burgerComponentOutside[0].image}
        />
      </div>
      <div className={`${Styles.order}`}>
        <div className={`${Styles.price} ml-3`}>
          <p className="text text_type_digits-medium pr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="submit" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerConstructor;
