import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_SHOW_MODAL_ORDER_NUMBER,
  ERROR_TEXT_GET_ORDER_NUMBER,
  GET_ORDER_NUMBER,
  OPEN_SHOW_MODAL_ORDER_NUMBER,
  ORDER_INGREDIENTS,
  REMOVE_ELEMENT,
  RESET_CONSTRUCTOR,
} from "../../services/actions";
import { getStoreOrderNumber } from "../../services/actions/orders";

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

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch({
      type: GET_ORDER_NUMBER,
      payload: null,
    });
    dispatch({
      type: ERROR_TEXT_GET_ORDER_NUMBER,
      payload: "",
    });
    dispatch(getStoreOrderNumber({ ingredients: orderIngredients }));
    dispatch({
      type: RESET_CONSTRUCTOR,
    });
  }

  return (
    <section className={`${Styles["section-constructor"]}`}>
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
      <ul className={`${Styles.list} custom-scroll`}>
        {constructorIngredients.map((element) => (
          <li key={element._id} className={`${Styles["list-element"]}`}>
            <DragIcon />
            <div className={`${Styles.div} ml-2 mr-2`}>
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                handleClose={() => {
                  dispatch({
                    type: REMOVE_ELEMENT,
                    payload: element._id,
                  });
                }}
              />
            </div>
          </li>
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
            {totalPrice || ""}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <form onSubmit={handleSubmit}>
          <Button
            htmlType="submit"
            onClick={handleshowModal}
            type="primary"
            size="large"
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
