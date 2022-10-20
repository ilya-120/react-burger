import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useRef, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
  CLOSE_SHOW_MODAL_ORDER_NUMBER,
  CONSTRUCTOR_BUNS,
  CONSTRUCTOR_INGREDIENTS,
  OPEN_SHOW_MODAL_ORDER_NUMBER,
  ORDER_INGREDIENTS,
  RESET_CONSTRUCTOR,
  RESET_OLD_ORDER_DATA,
} from "../../services/actions";
import { getStoreOrderNumber } from "../../services/actions/orders";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../BurgerConstructorElement/BurgerConstructorElement";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(null);
  const { constructorIngredients, constructorBuns, orderIngredients } =
    useSelector((store) => store.ingredients);
  const { showModal } = useSelector((store) => store.orderNumber);

  useEffect(() => {
    setTotalPrice(
      constructorIngredients
        .map((item) => item.price)
        .concat(Array(2).fill(constructorBuns.price || 0))
        .reduce((a, b) => a + b)
    );
    dispatch({
      type: ORDER_INGREDIENTS,
      payload: [constructorBuns._id].concat(
        constructorIngredients
          .map((item) => item.id)
          .concat(constructorBuns._id)
      ),
    });
  }, [constructorBuns, constructorIngredients, dispatch]);

  function handleshowModal() {
    dispatch({
      type: OPEN_SHOW_MODAL_ORDER_NUMBER,
    });
  }

  function handleCloseModal() {
    dispatch({
      type: CLOSE_SHOW_MODAL_ORDER_NUMBER,
    });
  }

  function dropNewIngredient(ingredient) {
    if (ingredient.type !== "bun") {
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
    drop(ingredient) {
      dropNewIngredient(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch({
      type: RESET_OLD_ORDER_DATA,
      payload: null,
    });
    dispatch(getStoreOrderNumber({ ingredients: orderIngredients }));
    dispatch({
      type: RESET_CONSTRUCTOR,
    });
  }

  const moveIngredient = useCallback(
    (dIndex, hIndex) => {
      let draggingIngredient = constructorIngredients[dIndex.index];
      const NewConstructorIngredients = [...constructorIngredients];
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
    <section ref={dropTarget} className={`${Styles["section-constructor"]}`}>
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
        {constructorIngredients.map((element, index) => (
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
            onClick={handleshowModal}
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
}

export default BurgerConstructor;
