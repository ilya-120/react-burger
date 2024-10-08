import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import { SyntheticEvent, useCallback, useEffect, useMemo } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getStoreOrderNumber } from "../../services/actions/amplifierActions/orders";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../BurgerConstructorElement/BurgerConstructorElement";
import {
  CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
  CONSTRUCTOR_BUNS,
  CONSTRUCTOR_INGREDIENTS,
  ORDER_INGREDIENTS,
  RESET_CONSTRUCTOR,
} from "../../services/actions/constructor";
import { RESET_OLD_ORDER_DATA } from "../../services/actions/orders";
import {
  CLOSE_SHOW_MODAL_ORDER_NUMBER,
  OPEN_SHOW_MODAL_ORDER_NUMBER,
} from "../../services/actions/modalOrder";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { TIngredient } from "../../utils/typeData";

import { constants } from "../../utils/data";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const { constructorIngredients, constructorBuns, orderIngredients } =
    useAppSelector((store) => store.constructorBurger);
  const { showModal } = useAppSelector((store) => store.modalOrder);
  const { isLogin } = useAppSelector((store) => store.userData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: ORDER_INGREDIENTS,
      payload: [
        constructorBuns._id,
        ...constructorIngredients!.map((item: TIngredient) => item.id),
        constructorBuns._id,
      ],
    });
  }, [constructorBuns, constructorIngredients, dispatch]);

  const totalPrice = useMemo(
    () =>
      constructorIngredients!
        .map((item: TIngredient) => item.price)
        .concat(Array(2).fill(constructorBuns.price || 0))
        .reduce((a, b) => a + b),
    [constructorIngredients, constructorBuns]
  );

  function handleCloseModal() {
    dispatch({
      type: RESET_CONSTRUCTOR,
    });
    dispatch({
      type: CLOSE_SHOW_MODAL_ORDER_NUMBER,
    });
  }

  function dropNewIngredient(ingredient: TIngredient) {
    if (ingredient.type !== constants.bun) {
      const newIdIngredient = {
        ...ingredient,
        id: ingredient._id,
        _id: uuidv4(),
      };
      dispatch({
        type: CONSTRUCTOR_INGREDIENTS,
        payload: newIdIngredient,
      });
    } else
      dispatch({
        type: CONSTRUCTOR_BUNS,
        payload: ingredient,
      });
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient: TIngredient) {
      dropNewIngredient(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    !isLogin
      ? navigate("/login")
      : dispatch({
          type: RESET_OLD_ORDER_DATA,
        });
    dispatch({
      type: OPEN_SHOW_MODAL_ORDER_NUMBER,
    });
    dispatch(getStoreOrderNumber({ ingredients: orderIngredients }));
  }

  const moveIngredient = useCallback(
    (dIndex: { index: number }, hIndex: number) => {
      let draggingIngredient = constructorIngredients![dIndex.index];
      const NewConstructorIngredients = [...constructorIngredients!];
      NewConstructorIngredients.splice(dIndex.index, 1);
      NewConstructorIngredients.splice(hIndex, 0, draggingIngredient);
      dispatch({
        type: CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
        payload: NewConstructorIngredients,
      });
    },
    [constructorIngredients, dispatch]
  );

  return (
    <section
      data-testid="constructor"
      ref={dropTarget}
      className={`${Styles["section-constructor"]}`}
    >
      <div className={`${Styles.div} pt-25 pb-2 ml-3`}>
        {constructorBuns._id && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorBuns.name} (верх)`}
            price={constructorBuns.price}
            thumbnail={constructorBuns.image}
          />
        )}
      </div>
      <ul className={`${Styles.list} ${isHover} custom-scroll`}>
        {constructorIngredients!.map((element: TIngredient, index: number) => (
          <BurgerConstructorElement
            key={element._id}
            element={element}
            index={index}
            moveIngredient={moveIngredient}
          />
        ))}
      </ul>
      <div className={`${Styles.div} ml-3`}>
        {constructorBuns._id && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorBuns.name} (низ)`}
            price={constructorBuns.price}
            thumbnail={constructorBuns.image}
          />
        )}
      </div>

      <div className={`${Styles.order}`}>
        <div className={`${Styles.price} ml-3`}>
          <p className="text text_type_digits-medium pr-2">
            {totalPrice || "0"}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <form onSubmit={handleSubmit}>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            disabled={!totalPrice}
          >
            Оформить заказ
          </Button>
        </form>
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal} title={""}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
