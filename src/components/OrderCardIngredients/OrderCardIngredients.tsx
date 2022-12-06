import { FC } from "react";
import Styles from "./OrderCardIngredients.module.css";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { TIngredient, TOrderData } from "../../utils/typeData";
import { RootState } from "../../services/reducers";
import OrderTime from "./OrderTime";
import OrderPrice from "./OrderPrice/OrderPrice";
import {
  getOrderIngredients,
  getOrderStatus,
  getItemsPrice,
  getOrderDate,
} from "../../hooks/ordersFunctions";

type TOrderCardIngredients = {
  name: string;
  number: number;
  ingredients: Array<string>;
  status?: string;
  order: TOrderData;
};

const OrderCardIngredients: FC<TOrderCardIngredients> = ({
  name,
  number,
  ingredients,
  status,
  order,
}) => {
  const location = useLocation();

  const pathName =
    location.pathname === "/feed"
      ? `/feed/${order?._id}`
      : `/profile/orders/${order._id}`;

  const allIngredients: TIngredient[] = useSelector(
    (store: RootState) => store.ingredients.ingredients
  );

  const orderIngredients = getOrderIngredients(
    ingredients,
    allIngredients
  ).slice(0, 6);
  const countIngredients = ingredients.length - 6;

  const orderStatus = status ? getOrderStatus(status, Styles) : null;

  const price = getItemsPrice(
    getOrderIngredients(order.ingredients, allIngredients)
  );

  const timeOrder = getOrderDate(order);

  return (
    <Link
      className={Styles.link}
      to={{ pathname: pathName }}
      state={{ backgroundLocation: location }}
    >
      <section className={Styles.section}>
        <div className={Styles.orderTime}>
          <span className="text text_type_digits-default">{`#${number}`}</span>
          <OrderTime time={timeOrder} />
        </div>
        <div className="mb-6">
          <h3 className="text text_type_main-medium">{name}</h3>
          {status && (
            <p
              className={`text text_type_main-default mt-2 ${orderStatus?.colorStatus}`}
            >
              {orderStatus?.nameStatus}
            </p>
          )}
        </div>
        <div className={Styles.containerOrderImg}>
          <ul className={Styles.list}>
            {orderIngredients.map((item: TIngredient, index: number) => {
              return (
                <li className={Styles.listItem} key={index}>
                  <img
                    src={item.image_large}
                    alt={item.name}
                    className={Styles.img}
                  />
                </li>
              );
            })}
            {ingredients.length > 6 && (
              <div className={Styles.overlay}>
                {" "}
                <span className="text text_type_main-default">{`+${countIngredients}`}</span>
              </div>
            )}
          </ul>
          <div className={Styles.containerPrice}>
            <OrderPrice price={price} />
          </div>
        </div>
      </section>
    </Link>
  );
};

export default OrderCardIngredients;
