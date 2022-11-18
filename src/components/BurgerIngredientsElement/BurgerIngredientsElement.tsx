import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredientsElement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import {
  OPEN_SHOW_MODAL,
} from "../../services/actions/modalIngredient";
import { Link, useLocation } from "react-router-dom";
import { AnyAction } from "redux";
import { FC } from "react";
import { TIngredient, TBurgerIngredientsElementProps } from "../../utils/typeData";

const BurgerIngredientsElement: FC<TBurgerIngredientsElementProps<TIngredient>> = ({ ingredient }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { constructorBuns, constructorIngredients } = useSelector(
    (store: AnyAction) => store.constructorBurger
  );

  const [, dragRef, dragPreviewRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  function handleshowModal() {
    dispatch({
      type: OPEN_SHOW_MODAL,
      payload: ingredient,
    });
  }

  const showCountMaterials = useMemo(() => {
    if (ingredient._id === constructorBuns._id) return 1;
    const id = constructorIngredients.filter(
      (item: TIngredient) => item.id === ingredient._id
    );
    return id.length;
  }, [constructorIngredients, constructorBuns, ingredient._id]);

  return (
    <Link
    to={`/ingredients/${ingredient._id}`}
    state={{backgroundLocation: location}} className={`${Styles.element} mb-8`} ref={dragRef}>
      <div onClick={handleshowModal}>
        {showCountMaterials >= 1 ? (
          <Counter size="default" count={showCountMaterials} />
        ) : (
          ""
        )}
        <img
          className="ml-4 mr-4 mb-1"
          src={ingredient.image}
          alt={ingredient.name}
          ref={dragPreviewRef}
        />
        <div className={`${Styles.currency} mb-1`}>
          <span className="text text_type_digits-default">
            {ingredient.price}
          </span>
          &nbsp;
          <CurrencyIcon type='primary' />
        </div>
        <span className="text text_type_main-small">{ingredient.name}</span>
      </div>

    </Link>
  );
};

export default BurgerIngredientsElement;
