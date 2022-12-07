import { FC } from "react";
import Styles from "./OrderIngredients.module.css";
import { constants } from "../../utils/data";
import { TOrderData } from "../../utils/typeData";
import OrderCardIngredients from "../OrderCardIngredients/OrderCardIngredients";

type TOrders = {
  orders: TOrderData[];
};

const OrderIngredients: FC<TOrders> = ({ orders }) => {
  return (
    orders && (
      <section className={Styles.section}>
        <h2 className='text text_type_main-large'>
          {constants.order_ingredients.title}
        </h2>
        <ul className={`${Styles.list} custom-scroll`}>
          {orders.map((order: TOrderData) => {
            return (
              <li key={order._id}>
                <OrderCardIngredients
                  number={order.number}
                  name={order.name}
                  ingredients={order.ingredients}
                  order={order}
                />
              </li>
            );
          })}
        </ul>
      </section>
    )
  );
};

export default OrderIngredients;
