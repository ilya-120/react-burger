import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { useContext, useEffect, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { OrderNumberContext } from "../utils/appContext";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_INGREDIENTS, REMOVE_ELEMENT, RESET_CONSTRUCTOR } from "../../services/actions";

function BurgerConstructor({ requestOrderNumber }) {
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [burgerComponentOutside, setBurgerComponentOutside] = useState({});
  const [burgerComponentInside, setBurgerComponentInside] = useState([]);
  const { setOrderNumber, setOrderError } = useContext(OrderNumberContext);
  const { constructorIngredients, constructorBuns } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    setTotalPrice(
      burgerComponentInside
        .map((item) => item.price)
        .concat(Array(2).fill(burgerComponentOutside.price || 0))
        .reduce((a, b) => a + b)
    );
    setOrderData(
      [burgerComponentOutside._id].concat(
        burgerComponentInside
          .map((item) => item.id)
          .concat(burgerComponentOutside._id)
      )
    );
    dispatch({
      type: ORDER_INGREDIENTS,
      payload: orderData,
    });
  }, [burgerComponentOutside, burgerComponentInside]);

  useEffect(() => {
    setBurgerComponentOutside(constructorBuns);
    setBurgerComponentInside(constructorIngredients);
  }, [constructorBuns, constructorIngredients]);

  function handleshowModal() {
    setshowModal(!showModal);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setOrderNumber(null);
    setOrderError("");
    requestOrderNumber({
      ingredients: orderData,
    });
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
            text={`${burgerComponentOutside.name} (верх)`}
            price={burgerComponentOutside.price}
            thumbnail={burgerComponentOutside.image}
          />
        )}
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
            text={`${burgerComponentOutside.name} (низ)`}
            price={burgerComponentOutside.price}
            thumbnail={burgerComponentOutside.image}
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
        <Modal onClose={handleshowModal} title={""}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  requestOrderNumber: PropTypes.func.isRequired,
};

export default BurgerConstructor;
