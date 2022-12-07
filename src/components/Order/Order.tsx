import { useEffect } from "react";
import Styles from "./Order.module.css";
import { useLocation, useParams } from "react-router-dom";
import { getOrderDate, getOrderIngredients, getItemsPrice, getOrderStatus, getQuantityItems } from "../../hooks/ordersFunctions";
import { WS_ORDERS_HISTORY_CLOSE, WS_ORDERS_HISTORY_OPEN, WS_USER_ORDERS_HISTORY_CLOSE, WS_USER_ORDERS_HISTORY_OPEN } from "../../services/actions/ws";

import { color, constants } from "../../utils/data";
import { TIngredient, TOrderData } from "../../utils/typeData";
import OrderPrice from "../OrderCardIngredients/OrderPrice/OrderPrice";
import OrderTime from "../OrderCardIngredients/OrderTime";
import { ClipLoader } from "react-spinners";
import OrderIngredient from "../App/OrderIngredient/OrderIngredient";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

const Order = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const isProfile = useLocation();

  useEffect(() => {
    dispatch(
      isProfile.pathname === '/profile/orders/' + id
        ? { type: WS_USER_ORDERS_HISTORY_OPEN }
        : { type: WS_ORDERS_HISTORY_OPEN }
    );
    return () => {
      dispatch(
        isProfile.pathname === '/profile/orders/' + id
          ? { type: WS_USER_ORDERS_HISTORY_CLOSE }
          : { type: WS_ORDERS_HISTORY_CLOSE }
      );
    };
  }, [dispatch, isProfile, id]);

  const { data, wsConnected } = useAppSelector(store =>   isProfile.pathname === '/profile/orders/' + id ? store.ordersUserHistory : store.ordersHistory);

  const order = data.orders.find((i: TOrderData) => i._id === id) as TOrderData;
  const timeOrder = getOrderDate(order);

  const allIngredients: TIngredient[] = useAppSelector(
    store => store.ingredients.ingredients
  );

  if (order) {
    const numberOfIngredients = getQuantityItems(order.ingredients);

    const orderIngredients = getOrderIngredients(
      Object.keys(numberOfIngredients),
      allIngredients
    );

    const quantity: Array<number> = Object.values(numberOfIngredients);

    const price = getItemsPrice(
      getOrderIngredients(order.ingredients, allIngredients)
    );
    const status = getOrderStatus(order.status, Styles);
    const render = () => {
      return (
        <section className={Styles.section}>
          <span
            className={`text text_type_digits-default mb-10 ${Styles.number}`}
          >
            #{order.number}
          </span>
          <h3 className='text text_type_main-medium mb-3'>{order.name}</h3>
          <span
            className={`text text_type_main-default mb-8 ${status.colorStatus}`}
          >
            {status.nameStatus}
          </span>
          <p className='text text_type_main-medium mb-4'>
            {constants.order.title}
          </p>
          <ul className={`${Styles.list} custom-scroll`}>
            {orderIngredients.map(
              (ingredient: TIngredient, index: number) => {
                return (
                  <li key={index}>
                    <OrderIngredient
                      ingredient={ingredient}
                      quantity={quantity[index]}
                    />
                  </li>
                );
              }
            )}
          </ul>
          <div className={Styles.total}>
            <OrderTime time={timeOrder} />
            <OrderPrice price={price} />
          </div>
        </section>
      );
    };
    return render();
  } else {
    return <ClipLoader color={color} loading={wsConnected} size={200} />;
  }
};

export default Order;
